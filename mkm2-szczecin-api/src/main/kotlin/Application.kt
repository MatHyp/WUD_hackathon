package com.wud.hackathon

import com.wud.hackathon.plugin.configureFrameworks
import com.wud.hackathon.plugin.configureHTTP
import com.wud.hackathon.plugin.configureRouting
import com.wud.hackathon.plugin.configureSerialization
import io.ktor.server.application.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    configureSerialization()
    configureHTTP()
    configureFrameworks()
    configureRouting()
}
