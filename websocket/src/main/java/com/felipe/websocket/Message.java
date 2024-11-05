package com.felipe.websocket;

import java.util.Arrays;
import java.util.List;

public class Message {
    private String text;
    private String type;
    private String user;
   

    public Message(String text, String type, String user){
        this.text = text;
        this.user = user;
        List<String> validTypes =  Arrays.asList("sender", "receiver", "open", "close");
        try{
            if(!validTypes.contains(type)){
                throw new IllegalArgumentException("Invalid type, you can use one of these types: " +  validTypes);
            }
            this.type = type;
        }catch(IllegalArgumentException exception){
            System.out.println(exception.getMessage());
        }
    }

    public String getText(){
        return text;
    }
    public String getType(){
        return type;
    }
    public String getUser(){
        return user;
    }
}
