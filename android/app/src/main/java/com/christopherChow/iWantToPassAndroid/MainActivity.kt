package com.christopherChow.iWantToPassAndroid

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.webkit.CookieManager
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val webView: WebView = findViewById(R.id.webview)
        webView.webViewClient = WebViewClient()
        webView.settings.javaScriptEnabled = true
        CookieManager.getInstance().acceptCookie();
        webView.loadUrl("https://christochow.github.io/i-want-to-pass/#/mobile")
    }

    override fun onPause() {
        super.onPause()
        CookieManager.getInstance().flush()
    }
}
