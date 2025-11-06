import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './additional.css';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке заметок:', error);
      setError('Не удалось загрузить заметки. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
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
      setError('Не удалось сохранить заметку. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    // Плавная прокрутка к форме
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту заметку?')) {
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Ошибка при удалении заметки:', error);
      setError('Не удалось удалить заметку. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Мои Заметки</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите заголовок заметки..."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          required
          disabled={isLoading}
        />
        <textarea
          placeholder="Введите текст заметки..."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Сохранение...' : editingNote ? 'Обновить заметку' : 'Создать заметку'}
        </button>
        {editingNote && (
          <button
            type="button"
            onClick={() => {
              setEditingNote(null);
              setTitle('');
              setContent('');
            }}
            className="cancel-button"
          >
            Отменить редактирование
          </button>
        )}
      </form>

      <div className="notes-list">
        {isLoading && <div className="loading">Загрузка...</div>}
        
        {!isLoading && notes.length === 0 && (
          <div className="empty-notes">
            Нет заметок. Создайте свою первую заметку!
          </div>
        )}
        
        {notes.map((note: Note) => (
          <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-date">
              {new Date(note.created_at).toLocaleString('ru-RU')}
            </div>
            <div className="note-actions">
              <button onClick={() => handleEdit(note)}>
                Редактировать
              </button>
              <button onClick={() => handleDelete(note.id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;