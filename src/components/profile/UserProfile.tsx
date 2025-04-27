
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserProfile = () => {
  // This would come from auth/database in a real app
  const user = {
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'Student Pilot',
    joined: 'April 2025',
    progress: {
      quizzesCompleted: 12,
      averageScore: 78,
      weakTopics: ['Weather', 'Airspace', 'Regulations'],
      strongTopics: ['Aircraft Systems', 'Aerodynamics'],
    },
    recentActivity: [
      { type: 'quiz', name: 'VFR Weather Minimums', date: '2 days ago', score: '85%' },
      { type: 'chat', topic: 'Magneto Operation', date: '3 days ago' },
      { type: 'study', material: 'Airplane Flying Handbook', date: '5 days ago' },
    ]
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=0D8ABC&color=fff`} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.role} • Joined {user.joined}</CardDescription>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="progress">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
              <CardDescription>Track your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Quizzes Completed</span>
                    <span className="text-sm font-medium">{user.progress.quizzesCompleted}</span>
                  </div>
                  <Progress value={Math.min(user.progress.quizzesCompleted / 20 * 100, 100)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Average Quiz Score</span>
                    <span className="text-sm font-medium">{user.progress.averageScore}%</span>
                  </div>
                  <Progress value={user.progress.averageScore} className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Areas for Improvement</h4>
                    <ul className="space-y-2">
                      {user.progress.weakTopics.map((topic, index) => (
                        <li key={index} className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Strong Areas</h4>
                    <ul className="space-y-2">
                      {user.progress.strongTopics.map((topic, index) => (
                        <li key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm inline-block mr-2 mb-2">
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent learning activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {user.recentActivity.map((activity, index) => (
                  <li key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between">
                      <div>
                        {activity.type === 'quiz' && (
                          <>
                            <p className="font-medium">Completed Quiz: {activity.name}</p>
                            <p className="text-sm text-muted-foreground">Score: {activity.score}</p>
                          </>
                        )}
                        {activity.type === 'chat' && (
                          <p className="font-medium">Chat Session: {activity.topic}</p>
                        )}
                        {activity.type === 'study' && (
                          <p className="font-medium">Studied: {activity.material}</p>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Email Address</h4>
                <div className="flex items-center gap-4">
                  <p className="text-muted-foreground">{user.email}</p>
                  <Button variant="outline" size="sm">Change</Button>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Password</h4>
                <Button variant="outline" size="sm">Change Password</Button>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Notifications</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="email-notif" className="rounded border-gray-300" defaultChecked />
                    <label htmlFor="email-notif">Email notifications</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="weekly-summary" className="rounded border-gray-300" defaultChecked />
                    <label htmlFor="weekly-summary">Weekly progress summary</label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
