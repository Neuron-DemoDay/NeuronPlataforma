'use client'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/Ui/ButtonLogin";
import { Input } from "../../components/Ui/InputLogin";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/Ui/CardLogin";
import { Label } from "../../components/Ui/LoginLabel";
import Checkbox from "../../components/Ui/Checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/Ui/Dialog";
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

const validatePassword = (password) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 10;
  return { hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar, hasMinLength };
};

const PrivacyPolicy = () => (
  <div className="max-h-96 overflow-y-auto">
    <h2 className="text-lg font-bold mb-2">Política de Privacidade</h2>
    <p>A sua privacidade é importante para nós. É política do Neuron respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Neuron, e outros sites que possuímos e operamos.</p>
    {"A sua privacidade é importante para nós. É política do Neuron respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Neuron, e outros sites que possuímos e operamos.Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.Compromisso do UsuárioO usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Neuron oferece no site e com caráter enunciativo, mas não limitativo:A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, pixbet ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Neuron, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.Mais informaçõesEsperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.Esta política é efetiva a partir de 4 December 2024 02:17"}
  </div>
);

const TermsOfUse = () => (
  <div className="max-h-96 overflow-y-auto">
    <h2 className="text-lg font-bold mb-2">Termos de Uso</h2>
    <p>Ao acessar ao site Neuron, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.</p>
    {"Ao acessar ao site Neuron, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.2. Uso de LicençaÉ concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Neuron , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode: modificar ou copiar os materiais; usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial); tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Neuron; remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Neuron a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.3. Isenção de responsabilidadeOs materiais no site da Neuron são fornecidos 'como estão'. Neuron não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.Além disso, o Neuron não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.4. LimitaçõesEm nenhum caso o Neuron ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Neuron, mesmo que Neuron ou um representante autorizado da Neuron tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.5. Precisão dos materiaisOs materiais exibidos no site da Neuron podem incluir erros técnicos, tipográficos ou fotográficos. Neuron não garante que qualquer material em seu site seja preciso, completo ou atual. Neuron pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Neuron não se compromete a atualizar os materiais.6. LinksO Neuron não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Neuron do site. O uso de qualquer site vinculado é por conta e risco do usuário.ModificaçõesO Neuron pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.Lei aplicávelEstes termos e condições são regidos e interpretados de acordo com as leis do Neuron e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade."}
  </div>
);

const handleInvalid = (e) => {
  e.preventDefault();
  const field = e.target.id;
  setErrors(prev => ({
    ...prev,
    [field]: "Este campo é obrigatório"
  }));
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('registerFormData');
    return savedFormData ? JSON.parse(savedFormData) : {
      nome: '',
      email: '',
      senha: '',
      confirmarsenha: '',
      data_nascimento: '',
      escolaridade: '',
      genero: '',
      telefone: ''
    };
  });

  const [showPassword, setShowPassword] = useState({
    senha: false,
    confirmarsenha: false
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false
  });

  const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isTermsOfUseOpen, setIsTermsOfUseOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.nome) newErrors.nome = "Nome é obrigatório";
    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    if (!formData.senha) newErrors.senha = "Senha é obrigatória";
    if (!formData.confirmarsenha) newErrors.confirmarsenha = "Confirmação de senha é obrigatória";
    if (formData.senha !== formData.confirmarsenha) newErrors.confirmarsenha = "As senhas não coincidem";
    if (!acceptedPrivacyPolicy) newErrors.privacyPolicy = "Você deve aceitar a Política de Privacidade";
    if (!acceptedTerms) newErrors.terms = "Você deve aceitar os Termos de Uso";

    const passwordValidation = validatePassword(formData.senha);
    if (!Object.values(passwordValidation).every(Boolean)) {
      newErrors.senha = "A senha não atende aos requisitos de segurança";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataToSend = {
      fullName: formData.nome,
      email: formData.email,
      password: formData.senha,
      ConfirmPassword: formData.confirmarsenha,
    };

    try {
      const response = await api.post('api/Account/register', dataToSend);
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.removeItem('registerFormData');
      navigate('/platform');
    } catch (error) {
      let errorMessage = 'Erro desconhecido ao cadastrar aluno.';
      
      if (error.response) {
        const statusCode = error.response.status;
        const errorData = error.response.data;
  
        switch (statusCode) {
          case 400:
            errorMessage = 'Erro de validação: os dados fornecidos são inválidos ou incompletos.';
            if (errorData && errorData.errors) {
              const validationErrors = Object.entries(errorData.errors)
                .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
                .join('\n');
              errorMessage += `\nErros de validação:\n${validationErrors}`;
            }
            break;
          case 401:
            errorMessage = 'Erro de autenticação: credenciais inválidas ou expiradas.';
            break;
          case 404:
            errorMessage = 'Erro: recurso não encontrado. A URL da API pode estar incorreta.';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
            break;
          default:
            errorMessage = `Erro ${statusCode}: ${errorData.message || 'Erro desconhecido do servidor'}`;
        }
      } else if (error.request) {
        errorMessage = 'Erro de comunicação com o servidor. Verifique a conexão e tente novamente.';
      } else {
        errorMessage = `Erro na configuração da requisição: ${error.message}`;
      }
  
      console.error(errorMessage);
      console.error(error);
      console.error("Erro ao fazer requisição:", error.response ? error.response.data : error.message);
  
      alert(errorMessage);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    const updatedFormData = {
      ...formData,
      [id]: value
    };
    setFormData(updatedFormData);
    localStorage.setItem('registerFormData', JSON.stringify(updatedFormData));

    if (id === 'senha') {
      setPasswordStrength(validatePassword(value));
    }

    // Clear the error for the field being changed
    setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <motion.div 
        className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 flex flex-col justify-between"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white text-3xl font-bold">Neuron</div>
        <div className="flex justify-center items-center h-full">
          <motion.img
            src="/placeholder.svg?height=400&width=400"
            alt="Register illustration"
            className="max-w-md rounded-lg shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </div>
      </motion.div>

      <div className="bg-[#fdfdf6] p-8 flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key="register-form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-blue-600">
                  Cadastro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <Label htmlFor="nome">Nome completo</Label>
                    <Input
                      id="nome"
                      placeholder="Digite seu nome completo"
                      value={formData.nome}
                      onChange={handleChange}
                      onInvalid={handleInvalid}
                      required
                      className={`transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${errors.nome ? 'border-red-500' : ''}`}
                    />
                    {errors.nome && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.nome}
                      </motion.p>
                    )}
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      onInvalid={handleInvalid}
                      required
                      className={`transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    <Label htmlFor="senha">Senha</Label>
                    <div className="relative">
                      <Input
                        id="senha"
                        type={showPassword.senha ? "text" : "password"}
                        placeholder="Digite sua senha"
                        value={formData.senha}
                        onChange={handleChange}
                        onInvalid={handleInvalid}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        required
                        className={`transition-all duration-300 focus:ring-2 focus:ring-blue-500 pr-10 ${errors.senha ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('senha')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showPassword.senha ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                      </button>
                    </div>
                    {errors.senha && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.senha}
                      </motion.p>
                    )}
                    {isPasswordFocused && (
                      <motion.div 
                        className="space-y-2 mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.5, 
                          ease: "easeInOut",
                          exit: { 
                            duration: 1.2, 
                            ease: "easeInOut",
                            delay: 0.1
                          }
                        }}
                      >
                        <p className="text-sm text-gray-600">A senha deve conter:</p>
                        <ul className="text-xs space-y-1">
                          <li className={passwordStrength.hasUpperCase ? "text-green-500" : "text-red-500"}>
                            {passwordStrength.hasUpperCase ? "✓" : "✗"} Uma letra maiúscula
                          </li>
                          <li className={passwordStrength.hasLowerCase ? "text-green-500" : "text-red-500"}>
                            {passwordStrength.hasLowerCase ? "✓" : "✗"} Uma letra minúscula
                          </li>
                          <li className={passwordStrength.hasNumber ? "text-green-500" : "text-red-500"}>
                            {passwordStrength.hasNumber ? "✓" : "✗"} Um número
                          </li>
                          <li className={passwordStrength.hasSpecialChar ? "text-green-500" : "text-red-500"}>
                            {passwordStrength.hasSpecialChar ? "✓" : "✗"} Um caractere especial
                          </li>
                          <li className={passwordStrength.hasMinLength ? "text-green-500" : "text-red-500"}>
                            {passwordStrength.hasMinLength ? "✓" : "✗"} No mínimo 10 caracteres
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </motion.div>
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    <Label htmlFor="confirmarsenha">Confirme sua senha</Label>
                    <div className="relative">
                      <Input
                        id="confirmarsenha"
                        type={showPassword.confirmarsenha ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        value={formData.confirmarsenha}
                        onChange={handleChange}
                        onInvalid={handleInvalid}
                        required
                        className={`transition-all duration-300 focus:ring-2 focus:ring-blue-500 pr-10 ${errors.confirmarsenha ? 'border-red-500' : ''}`}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirmarsenha')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                      >
                        {showPassword.confirmarsenha ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                      </button>
                    </div>
                    {errors.confirmarsenha && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.confirmarsenha}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacy-policy"
                        checked={acceptedPrivacyPolicy}
                        onChange={(e) => {
                          setAcceptedPrivacyPolicy(e.target.checked);
                          setErrors(prev => ({ ...prev, privacyPolicy: '' }));
                        }}
                      >
                        Eu li e aceito a{" "}
                        <DialogTrigger onClick={() => setIsPrivacyPolicyOpen(true)}>
                          Política de Privacidade
                        </DialogTrigger>
                      </Checkbox>
                    </div>
                    {errors.privacyPolicy && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.privacyPolicy}
                      </motion.p>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms-of-use"
                        checked={acceptedTerms}
                        onChange={(e) => {
                          setAcceptedTerms(e.target.checked);
                          setErrors(prev => ({ ...prev, terms: '' }));
                        }}
                      >
                        Eu li e aceito os{" "}
                        <DialogTrigger onClick={() => setIsTermsOfUseOpen(true)}>
                          Termos de Uso
                        </DialogTrigger>
                      </Checkbox>
                    </div>
                    {errors.terms && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-xs mt-1 flex items-center"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.terms}
                      </motion.p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <motion.button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cadastrar
                    </motion.button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
      <Dialog isOpen={isPrivacyPolicyOpen} onClose={() => setIsPrivacyPolicyOpen(false)}>
        <DialogHeader>
          <DialogTitle>Política de Privacidade</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <PrivacyPolicy />
        </DialogContent>
      </Dialog>

      <Dialog isOpen={isTermsOfUseOpen} onClose={() => setIsTermsOfUseOpen(false)}>
        <DialogHeader>
          <DialogTitle>Termos de Uso</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <TermsOfUse />
        </DialogContent>
      </Dialog>
    </div>
  );
}

