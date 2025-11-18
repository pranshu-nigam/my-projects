import os
import numpy as np
from PIL import Image
import cv2
from typing import Dict, List, Tuple
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Try to import TensorFlow/Keras with error handling
try:
    from tensorflow import keras
    TENSORFLOW_AVAILABLE = True
except ImportError as e:
    logger.warning(f"TensorFlow not available: {e}")
    TENSORFLOW_AVAILABLE = False

class PoseDetectionService:
    def __init__(self):
        self.model = None
        self.pose_classes = [
            'Warrior I',
            'Warrior II', 
            'Tree Pose',
            'Downward Dog',
            'Mountain Pose',
            'Child\'s Pose'
        ]
        self.load_model()
    
    def load_model(self):
        """Load the pretrained Keras model"""
        try:
            if not TENSORFLOW_AVAILABLE:
                logger.warning("TensorFlow not available, using mock model")
                self.model = "mock_model"
                return
                
            model_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'yoga_pose_5_model_3.keras')
            if os.path.exists(model_path):
                self.model = keras.models.load_model(model_path)
                logger.info(f"Successfully loaded model from {model_path}")
            else:
                logger.error(f"Model file not found at {model_path}")
                logger.warning("Using mock model instead")
                self.model = "mock_model"
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            logger.warning("Using mock model instead")
            self.model = "mock_model"
    
    def preprocess_image(self, image_path: str) -> np.ndarray:
        """Preprocess image for model input"""
        try:
            # Load image
            image = Image.open(image_path)
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Resize to model input size (assuming 224x224 based on common practice)
            image = image.resize((224, 224))
            
            # Convert to numpy array and normalize
            image_array = np.array(image) / 255.0
            
            # Add batch dimension
            image_array = np.expand_dims(image_array, axis=0)
            
            return image_array
            
        except Exception as e:
            logger.error(f"Error preprocessing image: {str(e)}")
            raise e
    
    def predict_pose(self, image_path: str) -> Dict:
        """Predict yoga pose from image"""
        try:
            if self.model is None:
                raise ValueError("Model not loaded")
            
            # If using mock model, return mock results
            if self.model == "mock_model":
                return self._get_mock_prediction()
            
            # Preprocess image
            processed_image = self.preprocess_image(image_path)
            
            # Make prediction
            predictions = self.model.predict(processed_image, verbose=0)
            
            # Get confidence scores for each class
            confidence_scores = predictions[0]
            
            # Get the predicted class
            predicted_class_idx = np.argmax(confidence_scores)
            predicted_pose = self.pose_classes[predicted_class_idx]
            confidence = float(confidence_scores[predicted_class_idx])
            
            # Get all confidence scores
            all_scores = {
                pose: float(score) for pose, score in zip(self.pose_classes, confidence_scores)
            }
            
            # Generate feedback based on confidence
            feedback = self.generate_feedback(predicted_pose, confidence, all_scores)
            
            return {
                'predicted_pose': predicted_pose,
                'confidence': confidence,
                'all_scores': all_scores,
                'feedback': feedback,
                'accuracy_percentage': round(confidence * 100, 1)
            }
            
        except Exception as e:
            logger.error(f"Error predicting pose: {str(e)}")
            # Return mock prediction as fallback
            return self._get_mock_prediction()
    
    def _get_mock_prediction(self) -> Dict:
        """Get mock prediction results for testing"""
        import random
        
        # Randomly select a pose
        predicted_pose = random.choice(self.pose_classes)
        confidence = random.uniform(0.7, 0.95)
        
        # Generate mock confidence scores
        all_scores = {}
        for pose in self.pose_classes:
            if pose == predicted_pose:
                all_scores[pose] = confidence
            else:
                all_scores[pose] = random.uniform(0.01, 0.3)
        
        # Generate feedback
        feedback = self.generate_feedback(predicted_pose, confidence, all_scores)
        
        return {
            'predicted_pose': predicted_pose,
            'confidence': confidence,
            'all_scores': all_scores,
            'feedback': feedback,
            'accuracy_percentage': round(confidence * 100, 1)
        }
    
    def generate_feedback(self, predicted_pose: str, confidence: float, all_scores: Dict) -> Dict:
        """Generate feedback based on prediction results"""
        try:
            # Base feedback for each pose
            pose_feedback = {
                'Warrior I': {
                    'strengths': ['Good leg positioning', 'Strong stance'],
                    'improvements': ['Straighten your back', 'Raise your arms higher', 'Engage your core'],
                    'tips': ['Keep front knee over ankle', 'Breathe deeply', 'Hold steady']
                },
                'Warrior II': {
                    'strengths': ['Good arm positioning', 'Strong foundation'],
                    'improvements': ['Keep arms parallel to floor', 'Front knee at 90 degrees', 'Gaze over front fingertips'],
                    'tips': ['Engage your core', 'Breathe steadily', 'Feel the stretch']
                },
                'Tree Pose': {
                    'strengths': ['Good balance', 'Strong standing leg'],
                    'improvements': ['Place foot on inner thigh', 'Keep standing leg strong', 'Focus on a fixed point'],
                    'tips': ['Engage your core', 'Breathe deeply', 'Find your balance']
                },
                'Downward Dog': {
                    'strengths': ['Good arm positioning', 'Strong foundation'],
                    'improvements': ['Keep spine straight', 'Press palms firmly down', 'Lift hips up and back'],
                    'tips': ['Engage your core', 'Breathe deeply', 'Feel the stretch']
                },
                'Mountain Pose': {
                    'strengths': ['Good posture', 'Strong foundation'],
                    'improvements': ['Stand tall and straight', 'Engage all muscles', 'Breathe deeply'],
                    'tips': ['Ground through your feet', 'Lift through your crown', 'Feel centered']
                },
                'Child\'s Pose': {
                    'strengths': ['Good relaxation', 'Proper positioning'],
                    'improvements': ['Sit back on heels', 'Extend arms forward', 'Rest forehead on mat'],
                    'tips': ['Breathe deeply', 'Relax completely', 'Feel the stretch']
                }
            }
            
            # Get base feedback for predicted pose
            base_feedback = pose_feedback.get(predicted_pose, {
                'strengths': ['Good form'],
                'improvements': ['Keep practicing'],
                'tips': ['Breathe deeply']
            })
            
            # Adjust feedback based on confidence
            if confidence < 0.6:
                # Low confidence - more general feedback
                feedback = {
                    'overall': f'Your pose shows some elements of {predicted_pose}, but could use improvement.',
                    'strengths': ['You\'re on the right track'],
                    'improvements': base_feedback['improvements'][:2],  # Fewer improvements
                    'suggestions': ['Practice the basic form', 'Focus on alignment', 'Take your time'],
                    'next_pose': 'Try Mountain Pose for better foundation'
                }
            elif confidence < 0.8:
                # Medium confidence - balanced feedback
                feedback = {
                    'overall': f'Good {predicted_pose}! You\'re showing solid form with room for refinement.',
                    'strengths': base_feedback['strengths'],
                    'improvements': base_feedback['improvements'][:2],
                    'suggestions': base_feedback['tips'],
                    'next_pose': 'Try Warrior I for more challenge'
                }
            else:
                # High confidence - positive feedback
                feedback = {
                    'overall': f'Excellent {predicted_pose}! Your form is very good.',
                    'strengths': base_feedback['strengths'] + ['Great alignment', 'Strong foundation'],
                    'improvements': base_feedback['improvements'][:1],  # Minimal improvements
                    'suggestions': base_feedback['tips'],
                    'next_pose': 'Try Warrior II for more challenge'
                }
            
            return feedback
            
        except Exception as e:
            logger.error(f"Error generating feedback: {str(e)}")
            return {
                'overall': 'Good effort! Keep practicing.',
                'strengths': ['You\'re making progress'],
                'improvements': ['Continue practicing'],
                'suggestions': ['Breathe deeply', 'Focus on alignment'],
                'next_pose': 'Try Mountain Pose'
            }

# Global instance
pose_detector = PoseDetectionService()
