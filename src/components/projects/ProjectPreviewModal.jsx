import React, { useState, useEffect } from 'react';
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; 
  padding: 15px 20px;
  border-bottom: 1px solid #e0e0e0;
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
  position: absolute;
  right: 20px;
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    position: relative;
    right: 0;
    width: 100%;
    justify-content: flex-end;
    margin-top: 10px;
  }
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

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 5px 10px;
  }
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
  background: rgba(255,255,255,0.9);
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
    font-size: 1rem;
  }

  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  h3 {
    color: #ef4444;
    margin-bottom: 10px;
  }

  p {
    color: #666;
    margin-bottom: 20px;
  }

  button {
    background: #10b981;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s;

    &:hover {
      background: #059669;
    }
  }
`;

const ProjectPreviewModal = ({ project, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);

  if (!project) return null;

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose();
  };

  const openFullScreen = () => {
    const iframe = document.getElementById('project-iframe');
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe && iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe && iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    }
  };

  const openNewWindow = () => {
    window.open(project.previewUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Set a timeout for loading (15 seconds for React apps)
    const timeout = setTimeout(() => {
      if (isLoading) {
        setLoadTimeout(true);
        setIsLoading(false);
      }
    }, 15000);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      clearTimeout(timeout);
    };
  }, [isLoading]);

  // Determine sandbox permissions based on project type
  const sandboxPermissions = project.type === 'react' 
    ? "allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
    : "allow-scripts allow-same-origin allow-forms allow-popups";

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{project.title}</ModalTitle>
          <HeaderButtons>
            <HeaderButton onClick={onClose}>Close</HeaderButton>
            {project.previewUrl && (
              <>
                <HeaderButton onClick={openFullScreen}>Full Screen</HeaderButton>
                <HeaderButton onClick={openNewWindow}>Open in New Tab</HeaderButton>
              </>
            )}
          </HeaderButtons>
        </ModalHeader>
        <IframeContainer>
          {isLoading && !hasError && !loadTimeout && (
            <LoadingOverlay>
              <div className="spinner"></div>
              <p>Loading {project.type === 'react' ? 'React app' : 'project'}...</p>
            </LoadingOverlay>
          )}
          
          {(hasError || loadTimeout) && (
            <ErrorMessage>
              <h3>Unable to Load Preview</h3>
              <p>
                {loadTimeout 
                  ? "The preview is taking longer than expected to load."
                  : "There was an error loading this project."}
              </p>
              <p>Try opening it in a new tab instead.</p>
              <button onClick={openNewWindow}>Open in New Tab</button>
            </ErrorMessage>
          )}
          
          <StyledIframe
            id="project-iframe"
            src={project.previewUrl}
            title={project.title}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            style={{ display: (isLoading || hasError || loadTimeout) ? 'none' : 'block' }}
            sandbox={sandboxPermissions}
            allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
          />
        </IframeContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProjectPreviewModal;