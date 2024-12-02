import React, { useState } from 'react';
import './Apps.css';
//import spotifyVerde from "../../assets/spotify-logo-verde.png";
//import spotifyBranca from "../../assets/spotify-logo.png";
//import notion from "../../assets/notion-logo.png"
//import agenda from "../../assets/google-agenda-logo.png"
//// import paginaSpotify from "../../assets/pagina-spotify"

// Componente Modal
function Modal({ title, content, onClose, downloadLink, modalImage, className }) {
    const handleDownload = () => {
        // Abre o link de download em uma nova aba
        window.open(downloadLink, "_blank");
    };

    return (
        <div className={`modal-overlay ${className}`}>
            <div className="modal">
                <div className="modal-header">
                    <div className="modal-logo">
                        <img src={modalImage} alt={title} className="logo" />  {/* Imagem do Modal */}
                    </div>
                    <div className="modal-title">{title}</div>
                </div>
                <div className="modal-content">{content}</div>
                <div className="modal-footer">
                    <button onClick={onClose}>Fechar</button>
                    <button onClick={handleDownload}>Baixar</button> {/* O botão agora abre o link em nova aba */}
                </div>
            </div>
        </div>
    );
}

// Componente Quadrado
function Quadrado({ id, title, content, color, onClick, squareImage }) {
    return (
        <div
            className="quadrado"
            style={{ backgroundColor: color || "#E0E0E0" }}
            onClick={() => onClick(id)}
        >
            <div className="quadrado-title">{title}</div>
            <div className="quadrado-logo">
                <img src={squareImage} alt={title} className="card-logo" />  {/* Imagem do Quadrado */}
            </div>
            <div className="quadrado-content">{content}</div>
        </div>
    );
}

// Componente App (onde você usa Modal e Quadrado)
function Apps() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const cardsData = [
        {
            id: 1,
            title: "Spotify",
            content: "",
            color: "#1DB954",
            modalContent: "O Spotify é um serviço de streaming de música e podcasts que permite aos usuários ouvir uma vasta biblioteca de conteúdos de áudio online. Ele serve para ouvir músicas, criar playlists personalizadas, descobrir novas faixas e acessar podcasts. Um benefício do Spotify é a conveniência de ouvir música sem precisar baixar arquivos, com a opção de usar a versão gratuita (com anúncios) ou a versão Premium, que oferece mais funcionalidades como ouvir sem anúncios e acessar músicas offline.",
            downloadLink: "https://www.spotify.com/br/download/",
            squareImage: spotifyBranca,
            modalImage: spotifyVerde,  // Imagem para o Modal
        },
        {
            id: 2,
            title: "Notion",
            content: "",
            color: "#F5F5F5",
            modalContent: "O Notion é uma plataforma de organização e produtividade que combina notas, tarefas, banco de dados e calendários em um único aplicativo. Ele serve para criar e gerenciar anotações, projetos e informações de forma personalizada. Um benefício do Notion é a flexibilidade, permitindo que os usuários adaptem a ferramenta às suas necessidades, criando páginas e templates para organizar melhor seu trabalho e vida pessoal.",
            downloadLink: "https://www.notion.so/desktop",
            squareImage: notion,
            modalImage: notion
        },
        {
            id: 3,
            title: "Agenda",
            content: "",
            color: "#F5F5F5",
            modalContent: "O Google Agenda é um aplicativo de gerenciamento de calendários e compromissos desenvolvido pelo Google. Ele serve para organizar eventos, reuniões e lembretes, além de permitir o compartilhamento de agendas com outras pessoas. Um benefício do Google Agenda é a integração com outros serviços do Google, como Gmail e Google Meet, facilitando a marcação automática de compromissos e envio de convites, além de sincronizar as informações entre diferentes dispositivos.",
            downloadLink: "https://workspace.google.com",
            squareImage: agenda,
            modalImage: agenda
        }
    ];

    const handleCardClick = (id) => {
        const card = cardsData.find(card => card.id === id);
        setSelectedCard(card);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCard(null);
    };

    return (
        <div className="container">
            <div className="grid">
                {cardsData.map((card) => (
                    <Quadrado
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        content={card.content}
                        color={card.color}
                        squareImage={card.squareImage}
                        onClick={handleCardClick}
                    />
                ))}
            </div>

            {isModalOpen && selectedCard && (
                <Modal
                    title={selectedCard.title}
                    content={selectedCard.modalContent}
                    onClose={handleCloseModal}
                    downloadLink={selectedCard.downloadLink}
                    modalImage={selectedCard.modalImage}  // Passando a imagem para o Modal
                    className={
                        selectedCard.id === 1
                            ? "modal-first-card"
                            : selectedCard.id === 2
                                ? "modal-second-card"
                                : "modal-third-card"
                    }
                />
            )}
        </div>
    );
}

export default Apps;
