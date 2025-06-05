
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wallet, User, Settings, LogOut, Copy } from "lucide-react";

const WalletButton = () => {
  const [isConnected, setIsConnected] = useState(true); // Mock connected state
  const walletAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Full mock wallet address
  const username = "JohnDoe"; // Mock username
  const userBalance = "1,234.56"; // Mock balance

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
  };

  // Format wallet address to show first 6 characters
  const shortAddress = `${walletAddress.slice(0, 6)}...`;

  if (!isConnected) {
    return (
      <Button onClick={handleConnect} className="bg-blue-600 hover:bg-blue-700">
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 px-3">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-xs bg-blue-100">
                <User className="w-3 h-3 text-blue-600" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium">{username}</span>
                <span className="text-xs text-muted-foreground">{shortAddress}</span>
              </div>
              <span className="text-xs text-muted-foreground">{userBalance} ETH</span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {walletAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Address</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletButton;
