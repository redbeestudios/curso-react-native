package com.cursorn.product

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.*

class ProductModule (private val context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "ProductModule"
    }

    private val preferences: SharedPreferences get() = context.applicationContext.getSharedPreferences(PRODUCT_PREFERENCES_KEY, Context.MODE_PRIVATE)

    private var products: MutableList<Product>? = null

    @ReactMethod
    fun initializeProducts(products: ReadableArray) {
        val productsToStore = mutableListOf<Product>()
        for (i in 0 until products.size()) {
            readableMapToProduct(products.getMap(i))
                .also { productsToStore.add(it) }
        }

        this.products = productsToStore
        storeProducts(productsToStore)
    }

    @ReactMethod
    fun getProducts(promise: Promise) {
        val inMemoryProducts = products
        if (inMemoryProducts != null) {
            promise.resolve(productListToReadableArray(inMemoryProducts))
            return
        }

        val stored = preferences.getString(PRODUCT_STORAGE_KEY, null)
        if (stored == null) {
            products = mutableListOf()
            promise.resolve(null)
            return
        }

        val products = stored.split("\n").dropLast(1).map { line ->
            val parts = line.split(";")
            Product(id = parts[0], name = parts[1], description = parts[2])
        }

        this.products = products.toMutableList()

        promise.resolve(productListToReadableArray(products))
    }

    @ReactMethod
    fun deleteProduct(id: String) {
        products?.removeAll { product -> product.id == id }
        products?.also { storeProducts(it) }
    }

    @ReactMethod
    fun createProduct(productMap: ReadableMap) {
        readableMapToProduct(productMap).also { products?.add(it) }
        products?.also { storeProducts(it) }
    }

    private fun readableMapToProduct(map: ReadableMap): Product =Product(
        id = map.getString("id")!!,
        name = map.getString("name")!!,
        description = map.getString("description")
    )

    private fun productListToReadableArray(productList: List<Product>): ReadableArray {
        val result = Arguments.createArray()

        productList.forEach { product ->
            val map = Arguments.createMap()
            map.putString("id", product.id)
            map.putString("name", product.name)
            map.putString("description", product.description)
            result.pushMap(map)
        }

        return result
    }

    private fun storeProducts(productsToStore: List<Product>) {
        with (preferences.edit()) {
            putString(PRODUCT_STORAGE_KEY, productsToStore.fold("") { acc, product ->
                acc + "${product.id};${product.name};${product.description}\n"
            })
            apply()
        }
    }

    companion object {
        const val PRODUCT_PREFERENCES_KEY = "Product"
        const val PRODUCT_STORAGE_KEY = "products"
    }
}