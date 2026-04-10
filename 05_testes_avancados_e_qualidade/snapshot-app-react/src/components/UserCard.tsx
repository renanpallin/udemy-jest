// Componente mais elaborado para demonstrar snapshot de UI

import React from "react";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  role,
  avatarUrl,
}) => {
  return (
    <div className="user-card">
      {avatarUrl && <img src={avatarUrl} alt={`${name}'s avatar`} />}
      <div className="user-card__info">
        <h2 className="user-card__name">{name}</h2>
        <p className="user-card__email">{email}</p>
        <span className="user-card__role">{role}</span>
      </div>
    </div>
  );
};
