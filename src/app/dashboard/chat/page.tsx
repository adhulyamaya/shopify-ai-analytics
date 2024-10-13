// "use client"; 

// import React, { useState } from 'react';

// const Chat: React.FC = () => {
//     const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
//     const [input, setInput] = useState('');
//     const [loading, setLoading] = useState(false); 
//     const handleSend = async () => {
//         if (input.trim()) {
//             setMessages([...messages, { user: 'You', text: input }]);
//             setInput('');
//             setLoading(true);
    
//             try {
//                 const encodedQuery = encodeURIComponent(input);
//                 const response = await fetch(`http://127.0.0.1:8000/ai/get_insights/?query=${encodedQuery}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
    
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
    
//                 const data = await response.json();
//                 console.log('Response Data:', data.related_products, data.answer, data.message);
//                 const relatedProduct = data.related_products[0]; 
//                 const message = relatedProduct.message || 'No message';
//                 const answer = relatedProduct.answer || 'No answer';

//                 setMessages((prev) => [
//                     ...prev,
//                     // { user: 'AI', text: `Message: ${message}` },
//                     { user: 'Answer', text: `: ${answer}` },
//                     // { user: 'AI', text: JSON.stringify(data.related_products) || 'No related products.' }
//                 ]);
//             } catch (error) {
//                 console.error('Error fetching AI response:', error);
//                 setMessages((prev) => [
//                     ...prev,
//                     { user: 'AI', text: 'Sorry, something went wrong.' },
//                 ]);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };
//     return (
//         <div className="chat-container" style={styles.container}>
//             <div className="chat-header" style={styles.header}>
//                 <h2>AI Assistant</h2>
//             </div>
//             <div className="chat-messages" style={styles.messages}>
//                 {messages.map((msg, index) => (
//                     <div key={index} style={styles.message}>
//                         <strong>{msg.user}: </strong>
//                         {msg.text}
//                     </div>
//                 ))}
//                 {loading && <div style={styles.loading}>AI is typing...</div>}
//             </div>
//             <div className="chat-input" style={styles.inputContainer}>
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                     style={styles.input}
//                     placeholder="Type your question..."
//                 />
//                 <button onClick={handleSend} style={styles.sendButton}>Send</button>
//             </div>
//         </div>
//     );
// };

// const styles: { [key: string]: React.CSSProperties } = {
//     container: {
//         display: 'flex',
//         flexDirection: 'column',
//         width: '100%',
//         height: '600px', 
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         overflow: 'hidden',
//         background: '#fff',
//     },
//     header: {
//         padding: '10px',
//         textAlign: 'center',
//     },
//     productSelect: {
//         marginTop: '5px',
//         padding: '5px',
//         borderRadius: '5px',
//         border: '1px solid #ccc',
//         width: '100%',
//     },
//     messages: {
//         flex: 1,
//         padding: '10px',
//         overflowY: 'scroll',
//         background: '#f8f9fa',
//     },
//     message: {
//         marginBottom: '10px',
//     },
//     loading: {
//         marginTop: '10px',
//         fontStyle: 'italic',
//         color: '#999',
//     },
//     inputContainer: {
//         display: 'flex',
//         padding: '10px',
//     },
//     input: {
//         flex: 1,
//         padding: '10px',
//         border: '1px solid #ccc',
//         borderRadius: '5px',
//         marginRight: '10px',
//     },
//     sendButton: {
//         padding: '10px 15px',
//         background: '#007bff',
//         color: '#fff',
//         border: 'none',
//         borderRadius: '5px',
//         cursor: 'pointer',
//     },
// };

// export default Chat;
"use client"; 

import React from 'react';
import { useState } from 'react';


interface RelatedProduct {
    message?: string;
    answer?: string;
}

interface ApiResponse {
    related_products: RelatedProduct[];
}

function Chat(): JSX.Element {
    const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async (): Promise<void> => {
        if (input.trim()) {
            setMessages([...messages, { user: 'You', text: input }]);
            setInput('');
            setLoading(true);

            try {
                const encodedQuery = encodeURIComponent(input);
                const response = await fetch(`http://127.0.0.1:8000/ai/get_insights/?query=${encodedQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: ApiResponse = await response.json();
                const relatedProduct = data.related_products[0];
                const answer = relatedProduct?.answer || 'No answer';

                setMessages((prev) => [
                    ...prev,
                    { user: 'Answer', text: `: ${answer}` },
                ]);
            } catch (error) {
                console.error('Error fetching AI response:', error);
                setMessages((prev) => [
                    ...prev,
                    { user: 'AI', text: 'Sorry, something went wrong.' },
                ]);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="chat-container" style={styles.container}>
            <div className="chat-header" style={styles.header}>
                <h2>AI Assistant</h2>
            </div>
            <div className="chat-messages" style={styles.messages}>
                {messages.map((msg, index) => (
                    <div key={msg.text + index} style={styles.message}>
                        <strong>{msg.user}: </strong>
                        {msg.text}
                    </div>
                ))}
                {loading && <div style={styles.loading}>AI is typing...</div>}
            </div>
            <div className="chat-input" style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    style={styles.input}
                    placeholder="Type your question..."
                />
                <button onClick={handleSend} style={styles.sendButton} type="button">Send</button>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '600px', 
        border: '1px solid #ccc',
        borderRadius: '5px',
        overflow: 'hidden',
        background: '#fff',
    },
    header: {
        padding: '10px',
        textAlign: 'center',
    },
    messages: {
        flex: 1,
        padding: '10px',
        overflowY: 'scroll',
        background: '#f8f9fa',
    },
    message: {
        marginBottom: '10px',
    },
    loading: {
        marginTop: '10px',
        fontStyle: 'italic',
        color: '#999',
    },
    inputContainer: {
        display: 'flex',
        padding: '10px',
    },
    input: {
        flex: 1,
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginRight: '10px',
    },
    sendButton: {
        padding: '10px 15px',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Chat;

