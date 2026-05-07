import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AdminCommittee = () => {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: '', role: 'Organising General Chairs', imageUrl: '' });
    const [loading, setLoading] = useState(true);

    const roles = [
        "Organising General Chairs",
        "General Co Chair",
        "TPC Chairs",
        "TPC Co Chairs",
        "Publication Chairs",
        "Publication Co-Chairs",
        "Finance Chairs",
        "Finance Co-Chairs"
    ];

    useEffect(() => {
        const q = query(collection(db, 'committee'), orderBy('role_index', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMembers(docs);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!newMember.name || !newMember.role) return;
        
        const roleIndex = roles.indexOf(newMember.role);
        
        try {
            await addDoc(collection(db, 'committee'), {
                ...newMember,
                role_index: roleIndex,
                created_at: new Date()
            });
            setNewMember({ name: '', role: 'Organising General Chairs', imageUrl: '' });
        } catch (error) {
            console.error("Error adding member: ", error);
        }
    };

    const handleDeleteMember = async (id) => {
        if (window.confirm('Delete this committee member?')) {
            try {
                await deleteDoc(doc(db, 'committee', id));
            } catch (error) {
                console.error("Error deleting member: ", error);
            }
        }
    };

    return (
        <div className="mgmt-card full-width">
            <h3>Committee Management</h3>
            <p className="mgmt-note">Add committee members and assign them to hierarchy roles.</p>
            
            <form onSubmit={handleAddMember} className="admin-form" style={{display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', background: '#f0f4f8', padding: '20px', borderRadius: '12px'}}>
                <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="form-input"
                    style={{flex: 1, minWidth: '200px'}}
                />
                <select 
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                    className="form-input"
                    style={{flex: 1, minWidth: '200px'}}
                >
                    {roles.map(role => <option key={role} value={role}>{role}</option>)}
                </select>
                <input 
                    type="text" 
                    placeholder="Image URL (from Image Management)" 
                    value={newMember.imageUrl}
                    onChange={(e) => setNewMember({...newMember, imageUrl: e.target.value})}
                    className="form-input"
                    style={{flex: 2, minWidth: '300px'}}
                />
                <button type="submit" className="btn btn-primary">Add Member</button>
                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={async () => {
                        if (window.confirm('This will add all default members from the committee image. Proceed?')) {
                            const defaultMembers = [
                                { name: 'Dr. Rajesha S', role: 'Organising General Chairs' },
                                { name: 'Dr. Nalinakshi N', role: 'General Co Chair' },
                                { name: 'Dr. Ravichandra R', role: 'General Co Chair' },
                                { name: 'Dr. Surendra H J', role: 'General Co Chair' },
                                { name: 'Dr. Keshava Murthy', role: 'TPC Chairs' },
                                { name: 'Dr. Devi Kannan', role: 'TPC Chairs' },
                                { name: 'Dr. Deepak N R', role: 'TPC Chairs' },
                                { name: 'Dr. Vasanthi S', role: 'TPC Co Chairs' },
                                { name: 'Dr. Prasuna VNP', role: 'TPC Co Chairs' },
                                { name: 'Dr. Farahana', role: 'TPC Co Chairs' },
                                { name: 'Dr. Jyothi Metan', role: 'Publication Chairs' },
                                { name: 'Dr. Pradeep', role: 'Publication Chairs' },
                                { name: 'Prof. Jayanthi', role: 'Publication Co-Chairs' },
                                { name: 'Dr. Ramesh N', role: 'Publication Co-Chairs' },
                                { name: 'Dr. Rakhi S', role: 'Publication Co-Chairs' },
                                { name: 'Dr. Kavitha S Patil', role: 'Publication Co-Chairs' },
                                { name: 'Dr. Anand', role: 'Finance Chairs' },
                                { name: 'Dr. Ravikumar J', role: 'Finance Chairs' },
                                { name: 'Prof. Somesh', role: 'Finance Co-Chairs' },
                                { name: 'Prof. Tejas S', role: 'Finance Co-Chairs' }
                            ];

                            try {
                                for (const member of defaultMembers) {
                                    const roleIndex = roles.indexOf(member.role);
                                    await addDoc(collection(db, 'committee'), {
                                        ...member,
                                        imageUrl: '',
                                        role_index: roleIndex,
                                        created_at: new Date()
                                    });
                                }
                                alert('Default committee members added successfully!');
                            } catch (error) {
                                console.error("Error seeding committee: ", error);
                            }
                        }
                    }}
                    style={{marginLeft: 'auto'}}
                >
                    Pre-populate All Members
                </button>
            </form>

            <div className="members-list">
                {loading ? <p>Loading committee...</p> : (
                    <table className="reg-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(member => (
                                <tr key={member.id}>
                                    <td>{member.name}</td>
                                    <td><span className={`role-badge role-${member.role_index}`}>{member.role}</span></td>
                                    <td>{member.imageUrl ? <img src={member.imageUrl} alt="" style={{width: '30px', height: '30px', borderRadius: '50%'}} /> : 'No Image'}</td>
                                    <td>
                                        <button onClick={() => handleDeleteMember(member.id)} style={{color: 'red', border: 'none', background: 'none', cursor: 'pointer'}}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {members.length === 0 && <tr><td colSpan="4" style={{textAlign: 'center'}}>No members added yet.</td></tr>}
                        </tbody>
                    </table>
                )}
            </div>
            
            <style>{`
                .role-badge {
                    padding: 4px 10px;
                    borderRadius: 20px;
                    fontSize: 12px;
                    fontWeight: 600;
                    color: #fff;
                }
                .role-0 { background: #e67e22; } /* Organising Chairs */
                .role-1 { background: #f1c40f; } /* General Co Chair */
                .role-2 { background: #2ecc71; } /* TPC Chairs */
                .role-3 { background: #16a085; } /* TPC Co Chairs */
                .role-4 { background: #3498db; } /* Publication Chairs */
                .role-5 { background: #2980b9; } /* Publication Co-Chairs */
                .role-6 { background: #9b59b6; } /* Finance Chairs */
                .role-7 { background: #8e44ad; } /* Finance Co-Chairs */
            `}</style>
        </div>
    );
};

export default AdminCommittee;
