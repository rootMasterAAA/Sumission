package com.nft.commands;

import com.nft.protocol.AuthProtocol;
import com.nft.utils.DjangoAPIEndPoints;
import com.nft.utils.Respond;
import net.md_5.bungee.api.chat.ClickEvent;
import net.md_5.bungee.api.chat.ComponentBuilder;
import net.md_5.bungee.api.chat.TextComponent;
import net.md_5.bungee.protocol.packet.Chat;
import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.command.*;
import org.bukkit.entity.Player;

import java.util.*;

public class TransactionCommand implements CommandExecutor, TabCompleter {
    private static final ConsoleCommandSender console = Bukkit.getServer().getConsoleSender();

    @Override
    public List<String> onTabComplete(CommandSender sender, Command command, String label, String[] args) {
        if (command.getName().equals("transaction")){
            if (args.length == 1){
                List<String> completions = new ArrayList<>();
                completions.add("buy");
                completions.add("sell");
                completions.add("admin");
                return completions;
            }
            else if (args.length == 2){
                List<String> completions = new ArrayList<>();
                completions.add("direct");
                completions.add("address");
                return completions;
            }
            else if (args.length > 2){
                return Collections.emptyList();
            }
        };
        return Collections.emptyList();
    }
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (sender instanceof Player player) {
            if (args.length < 2) {
                player.sendMessage(ChatColor.GOLD + "/transaction [create/sell] [direct/address]");
                return false;
            } else {
                if (args[0].equals("admin")) {
                    if (args[1].equals("create")) {
                        if (player.isOp()) {
                            if (args.length == 6) {
                                try {
                                    int upper_x = Integer.parseInt(args[2]);
                                    int upper_z = Integer.parseInt(args[3]);
                                    int lower_x = Integer.parseInt(args[4]);
                                    int lower_z = Integer.parseInt(args[5]);
                                    if ((upper_x == lower_x) || (upper_z == lower_z)){
                                        player.sendMessage("You can not assign the area with the same corrinate point.");
                                        return false;
                                    }
                                    Map<String, String> data = new HashMap<>();
                                    data.put("upper_x", args[2]);
                                    data.put("upper_z", args[3]);
                                    data.put("lower_x", args[4]);
                                    data.put("lower_z", args[5]);
                                    Respond respond = AuthProtocol.postToDataBaseBackendWithToken(player, data, DjangoAPIEndPoints.createAdminTransaction);
                                    if (respond.getStatus() < 299){
                                        player.sendMessage(ChatColor.GOLD + "Create successfully!");
                                        TextComponent component = new TextComponent("Copy transaction id to clipboard");
                                        component.setColor(net.md_5.bungee.api.ChatColor.RED);
                                        component.setBold(true);
                                        component.setUnderlined(true);
                                        component.setClickEvent(new ClickEvent(ClickEvent.Action.COPY_TO_CLIPBOARD, respond.getContent()));
                                        sender.spigot().sendMessage(component);
                                        return true;
                                    }
                                    else{
                                        player.sendMessage(ChatColor.RED + "Create fail!");
                                        return false;
                                    }
                                } catch (NumberFormatException e) {
                                    player.sendMessage(ChatColor.RED + "Invalid coordinate, the coordinate much be the integer");
                                }
                            }
                            return false;
                        }
                        else {
                            player.sendMessage(ChatColor.RED + "You has no permission to do this command");
                            return false;
                        }
                    }
                    else {
                        player.sendMessage(ChatColor.RED + "Unknown command");
                    }
                }
                if (args[0].equals("create")) {
                    if (args[1].equals("direct")) {
                        player.sendMessage("create direct");
                        return true;
                    } else if (args[1].equals("address")) {
                        player.sendMessage("create address");
                        return true;
                    }
                    return false;
                } else if (args[0].equals("sell")) {
                    if (args[1].equals("direct")) {
                        player.sendMessage("sell direct");
                        return true;
                    } else if (args[1].equals("address")) {
                        player.sendMessage("sell address");
                        return true;
                    }
                }
                player.sendMessage(ChatColor.RED + "Unknown Command");
                return false;
            }
        }
        return false;
    }
}
