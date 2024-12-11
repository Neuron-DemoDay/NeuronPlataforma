import { useState, useEffect } from 'react';
import { Bell, Home, Moon, Settings, Sun, User, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/Ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/Ui/Tabs";
import { useParams, useLocation } from 'react-router-dom';
import './video-lesson.css';

export default function VideoLesson() {
    const { id } = useParams();
    const location = useLocation();
    const titleFromCalendar = location.state?.title || 'Título não disponível';
    const [videoData, setVideoData] = useState({ title: titleFromCalendar, url: '' });
    const [annotations, setAnnotations] = useState([]);
    const [activities, setActivities] = useState([]);
    const [transcript, setTranscript] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('notes');
    const [activeAnnotation, setActiveAnnotation] = useState('ai');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        async function fetchVideoData() {
            try {
                const response = await fetch(`/api/video/${id}`);
                const textResponse = await response.text();
                console.log("Resposta raw:", textResponse);

                try {
                    const data = JSON.parse(textResponse);

                    if (data.length > 0) {
                        const video = data[0];
                        setVideoData({
                            title: titleFromCalendar,
                            url: video.embed || '',
                        });
                    } else {
                        console.error('Nenhum vídeo encontrado na resposta.');
                    }
                } catch (jsonError) {
                    console.error("Erro ao parsear JSON:", jsonError);
                }
            } catch (error) {
                console.error('Erro ao buscar os dados do vídeo:', error);
            }
        }

        fetchVideoData();
    }, [id, titleFromCalendar]);

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <motion.header
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="header"
                >
                    <h1 className="header-title">
                        {videoData.title ? videoData.title : 'Carregando...'}
                    </h1>
                </motion.header>

                {/* Video Section */}
                <main className="main-grid">
                    <div className="video-container">
                        {videoData.url ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="video-player"
                            >
                                <iframe
                                    className="w-full h-full rounded-lg"
                                    src={videoData.url.replace("watch?v=", "embed/")}
                                    title={videoData.title}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </motion.div>
                        ) : (
                            <p>Carregando vídeo...</p>
                        )}
                    </div>

                    {/* Annotations Section */}
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="annotations-section"
                    >
                        <Tabs value={activeAnnotation} onValueChange={setActiveAnnotation}>
                            <TabsList>
                                <TabsTrigger value="ai">Anotações IA</TabsTrigger>
                                <TabsTrigger value="activities">Atividades</TabsTrigger>
                                <TabsTrigger value="transcript">Transcrição</TabsTrigger>
                            </TabsList>

                            <TabsContent value="ai">
                                {annotations.map((note, i) => (
                                    <motion.div key={i} className="annotation-item">
                                        <p>{note}</p>
                                    </motion.div>
                                ))}
                            </TabsContent>

                            <TabsContent value="activities">
                                {activities.map((activity, i) => (
                                    <p key={i}>{activity}</p>
                                ))}
                            </TabsContent>

                            <TabsContent value="transcript">
                                <p>{transcript}</p>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
