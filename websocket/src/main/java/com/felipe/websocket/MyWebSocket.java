package com.felipe.websocket;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import com.google.gson.Gson;

public class MyWebSocket extends WebSocketServer {

    private ConcurrentHashMap<WebSocket, String> clients = new ConcurrentHashMap<>();
    private ArrayList<String> tokens = new ArrayList<String>();
    

    public MyWebSocket(InetSocketAddress inetSocketAddress) {
        super(inetSocketAddress);
        tokens.add("OtBTQ7YQavw3PZHBEuKfUlQhvHXfbT77IydS3rkUPTORTvqr2gjZRrFVfQkroUK3");
        tokens.add("yAtT5QJBqQlW1HRMPmSZlGIpaTYbzbAXOZdx8HHxvmVEr0UUPpjTa4KmadudDIXm");
        tokens.add("Et33hpqiEJA4dZPzxL2rIr9AHQAsmpa3gSjBIXEvlpEaQqx4bF5B7oH5ZMKxXSgP");
        tokens.add("FOTEQxtamdUBCtgt5tRJh5hwKV8DAEVTQoKobEebZeW9p5JyptDcoVWJGJvfuSme");
        tokens.add("zGrUs99i1kapoVOxGDCr1ROhCJYxEOPJKo68wDz639uM3fZ7lU06VsDcYEHWkzkS");
        tokens.add("test");
    }

    @Override
    public void onClose(WebSocket webSocket, int arg1, String arg2, boolean arg3) {
        Message msg = new Message("Connection is close", "close", clients.get(webSocket));
        clients.remove(webSocket);
        System.out.println("Connection is closed: ");
        System.out.println("Bye: " + webSocket.getRemoteSocketAddress().getAddress().getHostName());
        Gson gson = new Gson();
        String json = gson.toJson(msg);
        webSocket.send(json);
    }

    @Override
    public void onError(WebSocket webSocket, Exception exception) {
        System.out.println("Connetion error: " + exception.getMessage());
    }

    @Override
    public void onMessage(WebSocket webSocket, String message) {
        if(message.trim().isEmpty()){
            Exception ex = new Exception("Message is empty");
            onError(webSocket, ex);
            return;
        }
            
        System.out.println("Receive: " + webSocket.getRemoteSocketAddress().getAddress().getHostName());
        System.out.println("Message: " + message);
        WebSocket key = null;
        for (Entry<WebSocket, String> entry : clients.entrySet()) {
            key = entry.getKey();
            String token = entry.getValue();
            Message msg;
            Gson gson = new Gson();
            if (key != webSocket) {
                msg = new Message(message, "receiver", token);
                String json = gson.toJson(msg);
                key.send(json);
            }
            if (key == webSocket) {
                msg = new Message(message, "sender", token);
                String json = gson.toJson(msg);
                key.send(json);
            }
            key = null;
        }
    }

    @Override
    public void onOpen(WebSocket webSocket, ClientHandshake handshake) {
        String urlSend = handshake.getResourceDescriptor();
        String token = urlSend.substring(1);
        System.out.println("checking token...");
        boolean isValid = false;
        for(String validToken : tokens){
            if(token.equals(validToken)){
                isValid = true;
                break;
            }
        }
        if(!isValid){
            Message msg = new Message("Token Invalid!!!", "open", "invalid-token");
            Gson gson = new Gson();
            String json = gson.toJson(msg);
            webSocket.send(json);
            webSocket.close();
            return;
        }
            

        clients.put(webSocket, token);
        System.out.println("Connected!");
        System.out.println(webSocket.getRemoteSocketAddress().getAddress().getHostName());

        Message msg = new Message("The connection was made successfully", "open", token);
        Gson gson = new Gson();
        String json = gson.toJson(msg);
        webSocket.send(json);
    }

    @Override
    public void onStart() {
        System.out.println("server in port: " + getPort());
    }
}
