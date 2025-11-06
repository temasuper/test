import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingNote) {
        await axios.put(`${API_URL}/notes/${editingNote.id}`, { title, content });
      } else {
        await axios.post(`${API_URL}/notes`, { title, content });
      }
      setTitle('');
      setContent('');
      setEditingNote(null);
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при сохранении заметки:', error);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
    }
  };

  return (
    <div className="App">
      <h1>Заметки</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Содержание"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">
          {editingNote ? 'Обновить' : 'Создать'} заметку
        </button>
      </form>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button onClick={() => handleEdit(note)}>Редактировать</button>
              <button onClick={() => handleDelete(note.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;