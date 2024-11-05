package com.felipe.websocket;

import java.net.InetSocketAddress;

public class Server {
    public static void main(String[] args) {
        // String host = "192.168.1.6";
        String host = "0.0.0.0";
        int port = 8080;
        InetSocketAddress address = new InetSocketAddress(host, port);
        MyWebSocket server = new MyWebSocket(address);
        server.start();
        System.out.println("WebSocket server started on " + host + ":" + port);
    }
}
