package com.newapi

import android.content.Intent
import android.net.Uri
import android.os.Environment
import android.provider.Settings
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class ManageExternalStorageModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "ManageExternalStorage"
    }

    @ReactMethod
    fun hasPermission(promise: Promise) {
        try {
            val result = Environment.isExternalStorageManager()
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to check permission: ${e.message}")
        }
    }

    @ReactMethod
    fun requestPermission(promise: Promise) {
        try {
            val activity = currentActivity
            if (activity == null) {
                promise.reject("ERROR", "Activity is null")
                return
            }

            val intent = Intent(Settings.ACTION_MANAGE_APP_ALL_FILES_ACCESS_PERMISSION).apply {
                data = Uri.parse("package:${reactApplicationContext.packageName}")
            }
            activity.startActivity(intent)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to request permission: ${e.message}")
        }
    }
}
