
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, Heart, Eye, Plus, Calendar, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author_id: string;
  author_name: string;
  created_at: string;
  views: number;
  likes: number;
  category: string;
}

interface Comment {
  id: string;
  post_id: string;
  content: string;
  author_name: string;
  created_at: string;
}

const CommunityInsights = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // For now, create mock data since the tables structure needs to be updated
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'Community Safety Tips',
          content: 'Here are some important safety tips for our neighborhood. Always be aware of your surroundings and report any suspicious activities.',
          author_id: '1',
          author_name: 'John Doe',
          created_at: new Date().toISOString(),
          views: 45,
          likes: 12,
          category: 'safety'
        },
        {
          id: '2',
          title: 'Neighborhood Watch Update',
          content: 'Our neighborhood watch program is expanding. We are looking for more volunteers to help keep our community safe.',
          author_id: '2',
          author_name: 'Jane Smith',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          views: 32,
          likes: 8,
          category: 'community'
        }
      ];
      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      // Mock comments data
      const mockComments: Comment[] = [
        {
          id: '1',
          post_id: postId,
          content: 'Great post! Very helpful information.',
          author_name: 'Community Member',
          created_at: new Date().toISOString()
        }
      ];
      setComments(prev => ({ ...prev, [postId]: mockComments }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const createPost = async () => {
    if (!user || !newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      // For now, just add to local state
      const mockPost: BlogPost = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        author_id: user.id,
        author_name: user.email || 'Anonymous',
        created_at: new Date().toISOString(),
        views: 0,
        likes: 0,
        category: newPost.category
      };

      setPosts(prev => [mockPost, ...prev]);
      setNewPost({ title: '', content: '', category: 'general' });
      setShowCreateForm(false);
      
      toast({
        title: 'Success',
        description: 'Post created successfully!',
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      });
    }
  };

  const addComment = async (postId: string) => {
    if (!user || !newComment.trim()) return;

    try {
      const mockComment: Comment = {
        id: Date.now().toString(),
        post_id: postId,
        content: newComment,
        author_name: user.email || 'Anonymous',
        created_at: new Date().toISOString()
      };

      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), mockComment]
      }));
      setNewComment('');
      
      toast({
        title: 'Success',
        description: 'Comment added successfully!',
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        variant: 'destructive',
      });
    }
  };

  const handlePostClick = (postId: string) => {
    setSelectedPost(selectedPost === postId ? null : postId);
    if (selectedPost !== postId) {
      fetchComments(postId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Community Insights</h1>
          <p className="text-slate-600 dark:text-slate-400">Share experiences, discuss safety tips, and connect with your community</p>
        </div>
        {user && (
          <Button onClick={() => setShowCreateForm(!showCreateForm)} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        )}
      </div>

      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Share your insights with the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            >
              <option value="general">General</option>
              <option value="safety">Safety Tips</option>
              <option value="community">Community News</option>
              <option value="alerts">Alerts</option>
            </select>
            <Textarea
              placeholder="Write your post content here..."
              rows={6}
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={createPost} className="w-full sm:w-auto">Publish Post</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)} className="w-full sm:w-auto">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader onClick={() => handlePostClick(post.id)}>
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span className="truncate">{post.author_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {post.likes}
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{post.category}</Badge>
              </div>
              <CardDescription className="mt-2">
                {post.content.substring(0, 200)}...
              </CardDescription>
            </CardHeader>
            
            {selectedPost === post.id && (
              <CardContent>
                <div className="border-t pt-4">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Comments
                    </h4>
                    
                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                          <span className="font-medium text-sm">{comment.author_name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                      </div>
                    ))}
                    
                    {user && (
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Input
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
                          className="flex-1"
                        />
                        <Button onClick={() => addComment(post.id)} className="w-full sm:w-auto">
                          Post
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityInsights;
