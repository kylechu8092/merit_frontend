import type { Detection } from '@/components/ui/DetectionModal';

// Placeholder data — will be replaced by WebSocket feed
export const MOCK_DETECTIONS: Detection[] = [
  {
    id: 1, lat: 37.7800, lng: -122.4250, confidence: 94, confColor: '#00D084CC',
    time: '14:23:07', priority: 'high_conf', priorityColor: '#00D084',
    image: 'https://images.unsplash.com/photo-1715357187775-950b5b6c3f3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 2, lat: 37.7720, lng: -122.4100, confidence: 67, confColor: '#FFB800CC',
    time: '14:19:44', priority: 'pending_review', priorityColor: '#FFB800',
    image: 'https://images.unsplash.com/photo-1631255661386-687a3778a915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 3, lat: 37.7680, lng: -122.4300, confidence: 38, confColor: '#FF4444CC',
    time: '14:15:12', priority: 'low_conf', priorityColor: '#FF4444',
    image: 'https://images.unsplash.com/photo-1671630837717-9ff12a3bb33e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 4, lat: 37.7755, lng: -122.4180, confidence: 82, confColor: '#00D084CC',
    time: '14:11:30', priority: 'high_conf', priorityColor: '#00D084',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 5, lat: 37.7698, lng: -122.4220, confidence: 51, confColor: '#FFB800CC',
    time: '14:08:55', priority: 'pending_review', priorityColor: '#FFB800',
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 6, lat: 37.7740, lng: -122.4320, confidence: 29, confColor: '#FF4444CC',
    time: '14:05:22', priority: 'low_conf', priorityColor: '#FF4444',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
  {
    id: 7, lat: 37.7812, lng: -122.4150, confidence: 76, confColor: '#00D084CC',
    time: '14:02:09', priority: 'high_conf', priorityColor: '#00D084',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
  },
];
