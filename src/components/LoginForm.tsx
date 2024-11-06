import React, { useState } from 'react';
import { Level } from '../config/levels';

interface LoginFormProps {
  level: Level;
  onSubmit: (credentials: any) => Promise<boolean>;
}

const LoginForm: React.FC<LoginFormProps> = ({ level, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Verifying...');
    
    const success = await onSubmit(formData);
    setStatus(success ? 'Access Granted!' : 'Access Denied!');
    
    if (!success) {
      setTimeout(() => setStatus(''), 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        {Object.keys(level.requirements).map(req => (
          <div key={req}>
            <input
              type={req === 'password' ? 'password' : 'text'}
              name={req}
              placeholder={req.charAt(0).toUpperCase() + req.slice(1)}
              value={formData[req] || ''}
              onChange={handleChange}
              required
            />
            <br />
          </div>
        ))}
        <div className="hint">{level.hint}</div>
        <button type="submit">Submit</button>
        {status && <div className="status">{status}</div>}
      </form>
    </div>
  );
};

export default LoginForm;