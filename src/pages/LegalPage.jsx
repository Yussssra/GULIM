import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { policies } from '../data/policies';
import './LegalPage.css';

const LegalPage = () => {
    const { type } = useParams();
    const policy = policies[type];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [type]);

    if (!policy) {
        return <Navigate to="/" replace />;
    }

    // Function to parse the markdown-like bold/headers from our boilerplate into actual HTML
    const renderContent = (content) => {
        return content.split('\n').map((line, index) => {
            if (line.trim().startsWith('###')) {
                return <h3 key={index} className="policy-section-title">{line.replace('###', '').trim()}</h3>;
            }
            if (line.trim().startsWith('-')) {
                return <li key={index} className="policy-list-item">{line.replace('-', '').trim()}</li>;
            }
            if (line.trim().startsWith('*') && line.trim().endsWith('*')) {
                return <p key={index} className="policy-italic">{line.replace(/\*/g, '').trim()}</p>;
            }
            if (line.trim() === '') {
                return <br key={index} />;
            }
            return <p key={index} className="policy-paragraph">{line}</p>;
        });
    };

    return (
        <div className="legal-page">
            <div className="legal-container">
                <div className="legal-header">
                    <h1>{policy.title}</h1>
                    <p className="last-updated">Last Updated: {policy.lastUpdated}</p>
                </div>
                <div className="legal-content">
                    {renderContent(policy.content)}
                </div>
                <div className="legal-footer-note">
                    <p>
                        <strong>Note:</strong> This is a generic boilerplate document provided for demonstration and payment gateway approval purposes. GULIM ownership should thoroughly review and customize this content to ensure exact legal compliance with their business operations.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
