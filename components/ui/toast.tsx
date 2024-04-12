import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Text, View, StyleSheet, SafeAreaView } from 'react-native';

const toastVariants = {
  default: '#FFFFFF',
  destructive: '#E53E3E',
  success: '#48BB78',
  info: '#3182CE',
};

interface ToastProps {
  id: number;
  message: string;
  variant?: keyof typeof toastVariants;
  duration?: number;
  showProgress?: boolean;
  textColor?: string; 
  progressBarColor?: string; 
  progressBackgroundColor?: string; 
  onHide: (id: number) => void;
}

function Toast({
  id,
  message,
  onHide,
  variant = 'default',
  duration = 3000,
  showProgress = true,
  textColor = undefined, 
  progressBarColor = '#000000', 
  progressBackgroundColor = 'white',
}: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: duration - 1000,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onHide(id));
  }, [duration]);

  return (
    <Animated.View
      style={[
        styles.toast,
        { backgroundColor: toastVariants[variant], opacity },
        {
          transform: [
            {
              translateY: opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text style={[styles.toastMessage, { color: textColor }]}>{message}</Text> 
      {showProgress && (
        <View style={[styles.progressBar, { backgroundColor: progressBackgroundColor }]}> 
          <Animated.View
            style={[
              styles.progress,
              { backgroundColor: progressBarColor },
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    margin: 8,
    marginBottom: 4,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  toastMessage: {
    fontWeight: 'bold',
    color: '#000',
  },
  progressBar: {
    marginTop: 8,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  progress: {
    height: '100%',
    backgroundColor: '#000000',
  },
});

type ToastVariant = keyof typeof toastVariants;

interface ToastMessage {
  id: number;
  text: string;
  variant: ToastVariant;
  duration?: number;
  position?: string;
  showProgress?: boolean;
  textColor?: string; 
  progressBarColor?: string; 
  progressBackgroundColor?: string; 
}
interface ToastContextProps {
  toast: (options: {
    message: string;
    variant?: keyof typeof toastVariants;
    duration?: number;
    position?: 'top' | 'bottom';
    showProgress?: boolean;
    textColor?: string; 
    progressBarColor?: string; 
    progressBackgroundColor?: string; 
  }) => void;
  removeToast: (id: number) => void;
}
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

function ToastProvider({
  children,
  position = 'top',
}: {
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const toast = ({
    message,
    variant = 'default',
    duration = 3000,
    position,
    showProgress = true,
    textColor, 
    progressBarColor, 
    progressBackgroundColor, 
  }: {
    message: string;
    variant?: keyof typeof toastVariants;
    duration?: number;
    position?: 'top' | 'bottom';
    showProgress?: boolean;
    textColor?: string, 
    progressBarColor?: string, 
    progressBackgroundColor?: string, 
  }) => {
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: message,
        variant,
        duration,
        position,
        showProgress,
        textColor,
        progressBarColor,
        progressBackgroundColor
      },
    ]);
  };
  
  const removeToast = (id: number) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      <SafeAreaView style={{ position: 'absolute', [position]: 0, width: '100%' }}>
        {messages.map(message => (
          <Toast
            key={message.id}
            id={message.id}
            message={message.text}
            variant={message.variant}
            duration={message.duration}
            showProgress={message.showProgress}
            textColor={message.textColor}
            progressBarColor={message.progressBarColor}
            progressBackgroundColor={message.progressBackgroundColor}
            onHide={removeToast}
          />
        ))}
      </SafeAreaView>
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export { ToastProvider, ToastVariant, Toast, toastVariants, useToast };
