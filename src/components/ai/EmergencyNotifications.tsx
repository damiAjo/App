'use client';

import React, { useState } from 'react';

interface EmergencyNotification {
  id: string;
  type: 'alert' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  icon: string;
}

interface EmergencyNotificationsProps {
  onNotification?: (notification: EmergencyNotification) => void;
}

export const EmergencyNotifications: React.FC<EmergencyNotificationsProps> = ({
  onNotification,
}) => {
  const [notifications, setNotifications] = useState<EmergencyNotification[]>([]);
  const [showPanel, setShowPanel] = useState(false);

  const addNotification = (
    type: 'alert' | 'warning' | 'critical',
    title: string,
    message: string,
    icon: string
  ) => {
    const notification: EmergencyNotification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
      icon,
    };
    setNotifications((prev) => [notification, ...prev]);
    onNotification?.(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 10000);
  };

  const getTypeStyles = (type: string) => {
    const styles: Record<string, any> = {
      critical: { bg: '#f44336', border: '#c62828', text: '#fff' },
      warning: { bg: '#ff9800', border: '#e65100', text: '#fff' },
      alert: { bg: '#2196f3', border: '#1565c0', text: '#fff' },
    };
    return styles[type] || styles.alert;
  };

  return (
    <div
      style={{
        padding: '1rem',
        border: '2px solid #e91e63',
        borderRadius: '8px',
        marginBottom: '1rem',
      }}
      role="region"
      aria-label="Emergency notifications"
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Emergency Alerts
      </h2>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => addNotification('alert', 'Event Alert', 'Important event detected', '📢')}
          aria-label="Send alert notification"
          style={{
            padding: '0.75rem 1rem',
            background: '#2196f3',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Alert
        </button>
        <button
          onClick={() => addNotification('warning', 'Warning', 'Warning condition detected', '⚠️')}
          aria-label="Send warning notification"
          style={{
            padding: '0.75rem 1rem',
            background: '#ff9800',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Warning
        </button>
        <button
          onClick={() => addNotification('critical', 'Critical', 'Critical emergency!', '🚨')}
          aria-label="Send critical notification"
          style={{
            padding: '0.75rem 1rem',
            background: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Critical
        </button>
        <button
          onClick={() => setShowPanel(!showPanel)}
          aria-pressed={showPanel}
          aria-label={showPanel ? 'Hide notification history' : 'Show notification history'}
          style={{
            padding: '0.75rem 1rem',
            background: '#666',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          History ({notifications.length})
        </button>
      </div>

      {showPanel && (
        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            padding: '1rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          {notifications.length === 0 ? (
            <p style={{ color: '#999' }}>No notifications yet</p>
          ) : (
            notifications.map((notif) => {
              const typeStyle = getTypeStyles(notif.type);
              return (
                <div
                  key={notif.id}
                  style={{
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    backgroundColor: typeStyle.bg,
                    color: typeStyle.text,
                    borderLeft: `4px solid ${typeStyle.border}`,
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '0.75rem',
                  }}
                  role="alert"
                >
                  <span style={{ fontSize: '1.5rem' }}>{notif.icon}</span>
                  <div>
                    <strong>{notif.title}</strong>
                    <p style={{ margin: '0.25rem 0 0 0' }}>{notif.message}</p>
                    <small>
                      {notif.timestamp.toLocaleTimeString()}
                    </small>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
