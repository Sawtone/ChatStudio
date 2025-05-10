import { useState, useEffect } from 'react';
import { supabase } from '../route/api';
import { Card, Avatar, Typography, Button, Spin } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

export default function Settings() {
    const [settings, setSettings] = useState({
        darkMode: false,
        notifications: true,
      });

  return (
    <div>


    </div>
  );
}