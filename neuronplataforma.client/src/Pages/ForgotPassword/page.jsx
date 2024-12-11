'use client'

import { Link } from 'react-router-dom';
import { useState } from 'react'
import { Button } from "../../components/Ui/ButtonLogin"
import { Input } from "../../components/Ui/InputLogin"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/Ui/CardLogin"
import { Label } from "../../components/Ui/LoginLabel"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle password reset logic here
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="bg-gradient-to-br from-purple-600 to-indigo-800 p-8 flex flex-col justify-between">
        <div className="text-white text-3xl font-bold">Neuron</div>
        <div className="flex justify-center items-center h-full">
          <img 
            src="/placeholder.svg?height=400&width=400" 
            alt="Forgot password illustration"
            className="max-w-md rounded-lg shadow-xl"
          />
        </div>
      </div>
      
      <div className="bg-[#fdfdf6] p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-purple-600">Esqueceu sua senha?</CardTitle>
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
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Enviar link de recuperação
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link 
              href="/Login" 
              className="text-sm text-purple-600 hover:underline"
            >
              Voltar para o login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
