import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/Ui/Tabs";
import { useParams, useLocation } from 'react-router-dom';
import './video-lesson.css';

export default function VideoLesson() {
    const { id } = useParams();
    const location = useLocation();
    const titleFromCalendar = location.state?.title || 'Título não disponível';

    // Estados para armazenar dados do vídeo e transcrição
    const [videoData, setVideoData] = useState({ title: titleFromCalendar, url: '' });
    const [transcription, setTranscription] = useState('');
    const [videoIdForTranscription, setVideoIdForTranscription] = useState(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [transcriptionLoaded, setTranscriptionLoaded] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('transcript');

    // Gerenciamento do modo escuro
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    // Fetch video data
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

    // Fetch transcription after video data is loaded
    useEffect(() => {
        if (!videoLoaded || !videoIdForTranscription) return; // Aguarda o carregamento do vídeo e ID para buscar transcrição

        async function fetchTranscription() {
            try {
                const transcriptionResponse = await fetch(`/api/video/transcricao/${videoIdForTranscription}`);
                if (!transcriptionResponse.ok) {
                    console.error('Erro ao buscar a transcrição:', transcriptionResponse.statusText);
                    return;
                }

                const transcriptionData = await transcriptionResponse.json();
                setTranscription(
                    transcriptionData.map(entry => `${entry.start}s: ${entry.text}`).join('\n')
                );
                setTranscriptionLoaded(true); // Marca a transcrição como carregada
            } catch (error) {
                console.error('Erro ao buscar a transcrição:', error);
            }
        }

        fetchTranscription();
    }, [videoLoaded, videoIdForTranscription]); // Depende do vídeo estar carregado e do ID da transcrição

    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="main-content">
                <motion.header
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="header"
                >
                    <h1 className="header-title">
                        {videoData.title || 'Carregando...'}
                    </h1>
                </motion.header>

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

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="annotations-section"
                    >
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="transcript">Transcrição</TabsTrigger>
                            </TabsList>

                            <TabsContent value="transcript">
                                {transcriptionLoaded ? (
                                    <pre className="transcription-text">{transcription}</pre>
                                ) : (
                                    <p>Carregando transcrição...</p>
                                )}
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
