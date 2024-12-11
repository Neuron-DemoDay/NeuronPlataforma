'use client';

import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { Button } from "../../components/Ui/buttonLogin.tsx";
import { Input } from "../../components/Ui/InputLogin.tsx";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/Ui/CardLogin.tsx";
import { Label } from "../../components/Ui/LoginLabel";
import api from "../../services/api.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };
    try {
      const response = await api.post('api/account/login', data);

      localStorage.setItem('email', email);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiration', response.data.expiration);

      // Redirecionar para a URL correta
      navigate('https://neuron-ia.com');
    } catch (error) {
      alert("O login falhou: " + error.message);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-800 p-8 flex flex-col justify-between">
        <div className="text-white text-3xl font-bold">Neuron</div>
        <div className="flex justify-center items-center h-full">
          <img 
            src="/placeholder.svg?height=400&width=400" 
            alt="Student illustration"
            className="max-w-md rounded-lg shadow-xl"
          />
        </div>
      </div>
      
      <div className="bg-[#fdfdf6] p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-600">Bem-vindo ao Neuron!</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required                   
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Iniciar Sessão
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link 
              to="/ForgotPassword" 
              className="text-sm text-purple-600 hover:underline"
            >
              Esqueceu sua senha?
            </Link>
            <div className="text-sm">
              Não tem uma conta?{" "}
              <Link 
                to="/register" 
                className="text-purple-600 hover:underline"
              >
                Cadastre-se
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
