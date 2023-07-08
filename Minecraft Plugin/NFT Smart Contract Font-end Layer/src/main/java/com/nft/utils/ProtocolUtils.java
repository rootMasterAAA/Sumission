package com.nft.utils;

import com.google.gson.Gson;
import com.nft.protocol.AuthProtocol;
import org.bukkit.Bukkit;
import org.bukkit.command.ConsoleCommandSender;
import org.bukkit.entity.Player;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

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
    public static String readRespondContent(HttpURLConnection connection) throws IOException {
        String line;
        StringBuffer respondContent = (StringBuffer) new StringBuffer();
        BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        while ((line = reader.readLine()) != null){
            respondContent.append(line);
        }
        return respondContent.toString();
    }
    public static Boolean checkExistUUID(Player player){
        UUID uuid = player.getUniqueId();
        Map<String,String> content = new HashMap<>();
        int status_code = AuthProtocol.checkStatusCode(content, DjangoAPIEndPoints.checkExistUUID);
        if (status_code == 200){
            return false;
        }
        else if (status_code == 409){
            return true;
        }
        return true;
    }
    public static Boolean isDjangoReady(){
        try{
            URL url = joinURI(DjangoAPIEndPoints.checkServerRespond).toURL();
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);
            int responseCode = connection.getResponseCode();
            if (responseCode == 200){
                return true;
            }
            else {
                return false;
            }
        }
        catch (MalformedURLException e){
            console.sendMessage("[Auth Protocol] The URL has wrong structure (MalformedURLException).");
            return false;
        }
        catch (IOException e){
            console.sendMessage("[Auth Protocol] The error occur in read and write data (IOException)");
            return false;
        }
    }
}
