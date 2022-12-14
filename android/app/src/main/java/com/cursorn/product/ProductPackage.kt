package com.cursorn.product

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.ReactApplicationContext
import com.cursorn.product.ProductModule
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ViewManager
import java.util.ArrayList

class ProductPackage : ReactPackage {
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): List<NativeModule> {
        val modules: MutableList<NativeModule> = ArrayList()
        modules.add(ProductModule(reactContext))
        return modules
    }
}