"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/dashboard/components/ui/avatar";
import { Button } from "@/app/dashboard/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/dashboard/components/ui/card";
import { Input } from "@/app/dashboard/components/ui/input";
import { Label } from "@/app/dashboard/components/ui/label";
import { Separator } from "@/app/dashboard/components/ui/separator";
import { Textarea } from "@/app/dashboard/components/ui/textarea";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export default function SettingsPage() {
    return (
        <div className="space-y-12" style={{ padding: 32 }}>
            {/* Profile Section */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your profile information
                    </p>
                </div>

                <Separator />

                <Card>
                    <CardHeader>
                        <CardTitle>Avatar</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-lg">
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <Button variant="outline">Change Avatar</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Enter your bio"
                                rows={4}
                            />
                        </div>
                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Account Section */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage your account information and security settings
                    </p>
                </div>

                <Separator />

                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password to keep your account secure</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" />
                        </div>
                        <Button>Update Password</Button>
                    </CardContent>
                </Card>

                <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>Actions in this section are irreversible</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Delete Account</p>
                                <p className="text-sm text-muted-foreground">
                                    Permanently delete your account and all associated data.
                                </p>
                            </div>
                            <Button variant="destructive">Delete</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}