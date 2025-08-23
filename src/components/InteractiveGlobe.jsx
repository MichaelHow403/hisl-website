import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from '@/components/ui/button'
import { Send, Globe } from 'lucide-react'
import huginnImage from '../assets/raven_huginn.png'
import muninnImage from '../assets/raven_muninn.png'

// Raven component that orbits the globe
function Raven({ position, color, speed = 1, image }) {
  const meshRef = useRef()
  const [texture, setTexture] = useState(null)
  
  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load(image, setTexture)
  }, [image])
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime() * speed
      meshRef.current.position.x = Math.cos(time) * 4
      meshRef.current.position.z = Math.sin(time) * 4
      meshRef.current.position.y = Math.sin(time * 0.5) * 2
      meshRef.current.lookAt(0, 0, 0)
    }
  })
  
  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.5, 0.5]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true}
        color={color}
      />
    </mesh>
  )
}

// Earth globe component
function Earth() {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })
  
  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#1e40af"
        wireframe={true}
        transparent={true}
        opacity={0.6}
      />
    </Sphere>
  )
}

// Data pulse component
function DataPulse({ start, end, delay = 0 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = (state.clock.getElapsedTime() + delay) % 3
      const progress = time / 3
      
      meshRef.current.position.lerpVectors(
        new THREE.Vector3(...start),
        new THREE.Vector3(...end),
        progress
      )
      
      meshRef.current.material.opacity = Math.sin(progress * Math.PI)
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color="#00ffff" transparent={true} />
    </mesh>
  )
}

// Main 3D Scene component
function GlobeScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      <Earth />
      
      <Raven 
        position={[4, 0, 0]} 
        color="#00ffff" 
        speed={0.5}
        image={huginnImage}
      />
      <Raven 
        position={[-4, 0, 0]} 
        color="#ff6b6b" 
        speed={0.7}
        image={muninnImage}
      />
      
      {/* Data pulses from user to globe */}
      <DataPulse start={[-6, -3, 2]} end={[0, 0, 0]} delay={0} />
      <DataPulse start={[6, -3, -2]} end={[0, 0, 0]} delay={1} />
      <DataPulse start={[0, -4, 3]} end={[0, 0, 0]} delay={2} />
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

export default function InteractiveGlobe() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!prompt.trim()) return
    
    setIsLoading(true)
    setResponse('')
    
    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-3bfecdbb798e441e82899dfabfd39ec6'
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      })
      
      const data = await response.json()
      
      if (data.choices && data.choices[0]) {
        setResponse(data.choices[0].message.content)
      } else {
        setResponse('Error: Unable to get response from DeepSeek API')
      }
    } catch (error) {
      setResponse('Error: Failed to connect to DeepSeek API')
      console.error('DeepSeek API Error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <section className="py-20 bg-gradient-to-b from-hisl-dark to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 hisl-text-glow">
            WHERE YOUR PROMPTS GO
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch Huginn & Muninn carry your prompts through the sovereign AI infrastructure
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Globe */}
          <div className="h-96 w-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <Suspense fallback={null}>
                <GlobeScene />
              </Suspense>
            </Canvas>
          </div>
          
          {/* Prompt Interface */}
          <div className="space-y-6">
            <div className="p-6 bg-card rounded-lg hisl-border-glow">
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                <Globe className="mr-3 h-6 w-6" />
                DeepSeek AI Interface
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your prompt for the ravens to carry..."
                  className="w-full h-32 p-4 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
                
                <Button 
                  type="submit" 
                  disabled={isLoading || !prompt.trim()}
                  className="w-full bg-primary text-hisl-dark hover:bg-primary/80 font-semibold"
                >
                  {isLoading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send to Ravens
                    </>
                  )}
                </Button>
              </form>
              
              {response && (
                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">Response from the Infrastructure:</h4>
                  <p className="text-foreground whitespace-pre-wrap">{response}</p>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-card/50 rounded-lg text-center">
                <h4 className="font-bold text-primary">Huginn</h4>
                <p className="text-sm text-muted-foreground">Thought & Memory</p>
              </div>
              <div className="p-4 bg-card/50 rounded-lg text-center">
                <h4 className="font-bold text-primary">Muninn</h4>
                <p className="text-sm text-muted-foreground">Mind & Intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

