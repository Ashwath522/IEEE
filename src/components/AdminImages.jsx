import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const AdminImages = () => {
    const [images, setImages] = useState([]);
    const [newImage, setNewImage] = useState({ name: '', url: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'images'), orderBy('name', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setImages(docs);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddImage = async (e) => {
        e.preventDefault();
        if (!newImage.name || !newImage.url) return;
        
        try {
            await addDoc(collection(db, 'images'), {
                ...newImage,
                created_at: new Date()
            });
            setNewImage({ name: '', url: '' });
        } catch (error) {
            console.error("Error adding image: ", error);
        }
    };

    const handleDeleteImage = async (id) => {
        if (window.confirm('Delete this image reference?')) {
            try {
                await deleteDoc(doc(db, 'images', id));
            } catch (error) {
                console.error("Error deleting image: ", error);
            }
        }
    };

    return (
        <div className="mgmt-card full-width">
            <h3>Image Management (Add via URL)</h3>
            <p className="mgmt-note">Add image URLs here to keep track of them and use them in the committee section.</p>
            
            <form onSubmit={handleAddImage} className="admin-form" style={{display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap'}}>
                <input 
                    type="text" 
                    placeholder="Image Name (e.g. Dr. Rajesha)" 
                    value={newImage.name}
                    onChange={(e) => setNewImage({...newImage, name: e.target.value})}
                    className="form-input"
                    style={{flex: 1, minWidth: '200px'}}
                />
                <input 
                    type="text" 
                    placeholder="Image URL (Direct link to image)" 
                    value={newImage.url}
                    onChange={(e) => setNewImage({...newImage, url: e.target.value})}
                    className="form-input"
                    style={{flex: 2, minWidth: '300px'}}
                />
                <button type="submit" className="btn btn-primary">Add Image Ref</button>
            </form>

            <div className="image-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
                {loading ? <p>Loading images...</p> : images.map(img => (
                    <div key={img.id} className="image-card" style={{border: '1px solid #ddd', padding: '10px', borderRadius: '8px', background: '#f9f9f9'}}>
                        <img src={img.url} alt={img.name} style={{width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px'}} />
                        <h4 style={{margin: '0 0 5px 0', fontSize: '14px'}}>{img.name}</h4>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(img.url);
                                    alert('URL copied to clipboard!');
                                }}
                                className="btn btn-secondary"
                                style={{padding: '4px 8px', fontSize: '12px'}}
                            >
                                Copy URL
                            </button>
                            <button 
                                onClick={() => handleDeleteImage(img.id)}
                                className="btn btn-secondary"
                                style={{padding: '4px 8px', fontSize: '12px', color: 'red', borderColor: 'red'}}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminImages;
