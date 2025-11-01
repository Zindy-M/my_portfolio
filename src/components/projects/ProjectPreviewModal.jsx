import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 1200px;
  height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  animation: slideUp 0.3s ease-in-out;
  overflow: hidden;

  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 95%;
    height: 90vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const ModalTitle = styled.h2`
  margin: 0 auto;
  font-size: 1.3rem;
  color: #333;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const HeaderButton = styled.button`
  background: #10b981;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.3s;

  &:hover { background: #059669; }
`;

const IframeContainer = styled.div`
  flex: 1;
  position: relative;
  background: #f5f5f5;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0.6);
  backdrop-filter: blur(5px);
  z-index: 10;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #10b981;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
  }

  p {
    color: #10b981;
    font-weight: 600;
  }

  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const ProjectPreviewModal = ({ project, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  if (!project) return null;

  const handleIframeLoad = () => setIsLoading(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      document.body.style.overflow = 'unset';
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      document.body.style.overflow = 'unset';
      onClose();
    }
  };

  const openFullScreen = () => {
    const iframe = document.getElementById('project-iframe');
    if (iframe && iframe.requestFullscreen) iframe.requestFullscreen();
  };

  const openNewWindow = () => {
    window.open(project.previewUrl, '_blank');
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{project.title}</ModalTitle>
          <HeaderButtons>
            <HeaderButton onClick={() => { document.body.style.overflow='unset'; onClose(); }}>Close</HeaderButton>
            {project.previewUrl && (
              <>
                <HeaderButton onClick={openFullScreen}>Full Screen</HeaderButton>
                <HeaderButton onClick={openNewWindow}>New Window</HeaderButton>
              </>
            )}
          </HeaderButtons>
        </ModalHeader>
        <IframeContainer>
          {isLoading && (
            <LoadingOverlay>
              <div className="spinner"></div>
              <p>Loading...</p>
            </LoadingOverlay>
          )}
          <StyledIframe
            id="project-iframe"
            src={project.previewUrl}
            title={project.title}
            onLoad={handleIframeLoad}
            style={{ display: isLoading ? 'none' : 'block' }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </IframeContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProjectPreviewModal;
