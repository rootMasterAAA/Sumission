package com.nft.smartcontract;

import com.google.gson.Gson;
import org.bukkit.Bukkit;
import org.bukkit.command.ConsoleCommandSender;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;

public class ProtocolUtils {
    private static final ConsoleCommandSender console = Bukkit.getServer().getConsoleSender();
    private static final String BACKEND_URL = "http://127.0.0.1:8000/";
    private static final Gson gson = new Gson();
    public static URI URIExceptionWrapper(){
        try{
            return new URI(BACKEND_URL);
        }
        catch (URISyntaxException e){
            return null;
        }
    }
    public static URI joinURI(String endpoint){
        URI path = URIExceptionWrapper();
        if (path != null){
            return path.resolve(endpoint);
        }
        else {
            return null;
        }
    }

    public static void loadBody(HttpURLConnection connection, String jsonData){
        try{
            DataOutputStream outputStream = new DataOutputStream(connection.getOutputStream());
            outputStream.writeBytes(jsonData);
            outputStream.flush();
            outputStream.close();
        }
        catch (IOException err){
            console.sendMessage("[] ");
        }
    }

}
