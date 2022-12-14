package com.cursorn.product

import com.squareup.moshi.JsonClass

data class Product (
    val id: String,
    val name: String,
    val description: String?
    ) { }