"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Building2,
  Users,
  Heart,
  Shield,
  Briefcase,
  MapPin,
  CheckCircle,
  X,
  UserCheck,
  HeadphonesIcon,
  Stethoscope,
  HardHat,
  FileText,
  Building,
  Landmark,
  UserCog,
  HandHeart,
  Lock,
  Trophy,
  Star,
  RotateCcw,
} from "lucide-react"
import Image from "next/image"

interface Actor {
  id: string
  name: string
  category: "internal" | "external"
  icon: React.ReactNode
  color: string
  description: string
  missions: string[]
}

const actorsData: Actor[] = [
  {
    id: "employeur",
    name: "L'Employeur",
    category: "internal",
    icon: <Briefcase className="w-4 h-4" />,
    color: "bg-blue-600",
    description: "Responsable principal de la sécurité et de la santé des salariés dans l'entreprise.",
    missions: [
      "Évaluer les risques professionnels",
      "Mettre en place des mesures de prévention",
      "Former et informer les salariés",
      "Assurer la surveillance médicale",
      "Respecter la réglementation SSCT",
    ],
  },
  {
    id: "drh-manager",
    name: "DRH / Managers",
    category: "internal",
    icon: <UserCog className="w-4 h-4" />,
    color: "bg-blue-500",
    description: "Responsables hiérarchiques et RH qui déclinent la politique SSCT sur le terrain.",
    missions: [
      "Appliquer la politique de prévention",
      "Encadrer les équipes en sécurité",
      "Gérer les formations SSCT",
      "Suivre les indicateurs de sécurité",
      "Organiser les accueils sécurité",
    ],
  },
  {
    id: "salarie",
    name: "Le Salarié",
    category: "internal",
    icon: <Users className="w-4 h-4" />,
    color: "bg-green-600",
    description: "Acteur central qui doit prendre soin de sa sécurité et de celle de ses collègues.",
    missions: [
      "Respecter les consignes de sécurité",
      "Utiliser correctement les EPI",
      "Signaler les situations dangereuses",
      "Participer aux formations",
      "Exercer son droit de retrait si nécessaire",
    ],
  },
  {
    id: "salarie-competent",
    name: "Salarié Compétent",
    category: "internal",
    icon: <UserCheck className="w-4 h-4" />,
    color: "bg-green-500",
    description: "Salarié désigné par l'employeur pour s'occuper des activités de protection et de prévention.",
    missions: [
      "Assister l'employeur dans l'évaluation des risques",
      "Proposer des mesures de prévention",
      "Participer à l'information des salariés",
      "Coordonner les actions de prévention",
      "Faire le lien avec les services externes",
    ],
  },
  {
    id: "medecin",
    name: "Médecin du Travail",
    category: "internal",
    icon: <Stethoscope className="w-4 h-4" />,
    color: "bg-red-600",
    description: "Professionnel de santé spécialisé dans la prévention des risques professionnels.",
    missions: [
      "Surveiller l'état de santé des salariés",
      "Conseiller employeurs et salariés",
      "Étudier les postes de travail",
      "Proposer des aménagements",
      "Participer à l'évaluation des risques",
    ],
  },
  {
    id: "infirmier",
    name: "Infirmier du Travail",
    category: "internal",
    icon: <Heart className="w-4 h-4" />,
    color: "bg-red-500",
    description: "Professionnel de santé qui assiste le médecin du travail dans ses missions.",
    missions: [
      "Réaliser des entretiens infirmiers",
      "Effectuer des examens complémentaires",
      "Participer aux actions de prévention",
      "Assurer les premiers secours",
      "Contribuer à la veille sanitaire",
    ],
  },
  {
    id: "cse",
    name: "CSE / CSSCT",
    category: "internal",
    icon: <Shield className="w-4 h-4" />,
    color: "bg-purple-600",
    description: "Instance représentative du personnel en matière de santé et sécurité.",
    missions: [
      "Analyser les risques professionnels",
      "Enquêter sur les accidents",
      "Proposer des améliorations",
      "Consulter sur les projets",
      "Inspecter les lieux de travail",
    ],
  },
  {
    id: "referent-handicap",
    name: "Référent Handicap",
    category: "internal",
    icon: <HandHeart className="w-4 h-4" />,
    color: "bg-purple-500",
    description: "Personne chargée d'orienter, d'informer et d'accompagner les personnes en situation de handicap.",
    missions: [
      "Accueillir et informer les personnes handicapées",
      "Accompagner la mise en place d'aménagements",
      "Sensibiliser les équipes",
      "Faire le lien avec les organismes spécialisés",
      "Suivre l'intégration professionnelle",
    ],
  },
  {
    id: "referent-harcelement",
    name: "Référent Harcèlement",
    category: "internal",
    icon: <HeadphonesIcon className="w-4 h-4" />,
    color: "bg-purple-400",
    description: "Personne chargée de lutter contre le harcèlement sexuel et les agissements sexistes.",
    missions: [
      "Informer et sensibiliser sur le harcèlement",
      "Orienter les victimes",
      "Accompagner les procédures",
      "Former les managers",
      "Proposer des actions de prévention",
    ],
  },
  {
    id: "spst",
    name: "Service de Prévention",
    category: "external",
    icon: <Building2 className="w-4 h-4" />,
    color: "bg-orange-600",
    description: "Service externe qui accompagne les entreprises dans leur démarche de prévention.",
    missions: [
      "Conseiller en prévention",
      "Former les acteurs",
      "Réaliser des études de poste",
      "Accompagner les entreprises",
      "Assurer la surveillance médicale",
    ],
  },
  {
    id: "iprp",
    name: "IPRP",
    category: "external",
    icon: <HardHat className="w-4 h-4" />,
    color: "bg-orange-500",
    description: "Experts techniques qui interviennent dans les domaines de la prévention des risques professionnels.",
    missions: [
      "Réaliser des études techniques",
      "Conseiller sur les risques spécifiques",
      "Proposer des solutions techniques",
      "Former sur les risques métiers",
      "Accompagner les démarches de prévention",
    ],
  },
  {
    id: "carsat",
    name: "CARSAT",
    category: "external",
    icon: <Landmark className="w-4 h-4" />,
    color: "bg-indigo-600",
    description: "Caisse d'Assurance Retraite et de la Santé au Travail.",
    missions: [
      "Contrôler l'application des règles",
      "Accompagner les entreprises",
      "Développer la prévention",
      "Indemniser les accidents du travail",
      "Fixer les taux de cotisation",
    ],
  },
  {
    id: "dreets",
    name: "DREETS",
    category: "external",
    icon: <Building className="w-4 h-4" />,
    color: "bg-indigo-500",
    description: "Direction Régionale de l'Économie, de l'Emploi, du Travail et des Solidarités.",
    missions: [
      "Contrôler l'application du droit du travail",
      "Enquêter sur les accidents graves",
      "Sanctionner les manquements",
      "Accompagner les entreprises",
      "Délivrer les autorisations réglementaires",
    ],
  },
  {
    id: "cnam",
    name: "CNAM",
    category: "external",
    icon: <FileText className="w-4 h-4" />,
    color: "bg-indigo-400",
    description: "Caisse Nationale d'Assurance Maladie - Branche AT/MP du régime général.",
    missions: [
      "Définir la politique de prévention",
      "Élaborer la réglementation technique",
      "Piloter la tarification",
      "Développer les outils de prévention",
      "Coordonner les actions nationales",
    ],
  },
]

interface BuildingQuiz {
  question: string
  missions: string[]
  correctActors: string[]
  wrongActors: string[]
}

interface NgsBuilding {
  id: string
  name: string
  position: { x: number; y: number }
  actors: string[]
  imagePath: string
  quiz: BuildingQuiz
}

const buildingsData: NgsBuilding[] = [
  {
    id: "direction",
    name: "Bureau RH",
    position: { x: 15, y: 55 },
    actors: ["employeur", "drh-manager"],
    imagePath: "/images/bureau-rh.png",
    quiz: {
      question: "Qui réalise ces missions ?",
      missions: [
        "Évaluer les risques professionnels",
        "Mettre en place des mesures de prévention",
        "Appliquer la politique de prévention",
        "Encadrer les équipes en sécurité",
      ],
      correctActors: ["employeur", "drh-manager"],
      wrongActors: ["medecin", "cse", "spst"],
    },
  },
  {
    id: "bureau-salarie",
    name: "Bureau du Salarié",
    position: { x: 30, y: 85 },
    actors: ["salarie", "salarie-competent"],
    imagePath: "/images/bureau-salarie.png",
    quiz: {
      question: "Qui réalise ces missions ?",
      missions: [
        "Respecter les consignes de sécurité",
        "Utiliser correctement les EPI",
        "Assister l'employeur dans l'évaluation des risques",
        "Coordonner les actions de prévention",
      ],
      correctActors: ["salarie", "salarie-competent"],
      wrongActors: ["medecin", "carsat", "drh-manager"],
    },
  },
  {
    id: "infirmerie",
    name: "Infirmerie",
    position: { x: 40, y: 40 },
    actors: ["medecin", "infirmier"],
    imagePath: "/images/infirmerie.png",
    quiz: {
      question: "Qui réalise ces missions ?",
      missions: [
        "Surveiller l'état de santé des salariés",
        "Conseiller employeurs et salariés",
        "Réaliser des entretiens infirmiers",
        "Assurer les premiers secours",
      ],
      correctActors: ["medecin", "infirmier"],
      wrongActors: ["employeur", "cse", "iprp"],
    },
  },
  {
    id: "bureau-medecin",
    name: "Bureau du Médecin",
    position: { x: 55, y: 70 },
    actors: ["medecin"],
    imagePath: "/images/bureau-medecin.png",
    quiz: {
      question: "Qui réalise ces missions ?",
      missions: [
        "Étudier les postes de travail",
        "Proposer des aménagements",
        "Participer à l'évaluation des risques",
        "Surveiller l'état de santé des salariés",
      ],
      correctActors: ["medecin"],
      wrongActors: ["employeur", "salarie", "cse", "spst"],
    },
  },
  {
    id: "cse-bureau",
    name: "CSE",
    position: { x: 70, y: 25 },
    actors: ["cse", "referent-handicap", "referent-harcelement"],
    imagePath: "/images/cse.png",
    quiz: {
      question: "Qui réalise ces missions ?",
      missions: [
        "Analyser les risques professionnels",
        "Enquêter sur les accidents",
        "Accompagner les personnes handicapées",
        "Lutter contre le harcèlement",
      ],
      correctActors: ["cse", "referent-handicap", "referent-harcelement"],
      wrongActors: ["employeur", "medecin", "spst"],
    },
  },
  {
    id: "institutionnels",
    name: "Partenaires Institutionnels",
    position: { x: 85, y: 65 },
    actors: ["carsat", "dreets", "cnam", "spst", "iprp"],
    imagePath: "/images/partenaires-institutionnels.png",
    quiz: {
      question: "Qui réalise ces missions ?",
      missions: [
        "Contrôler l'application des règles",
        "Sanctionner les manquements",
        "Définir la politique de prévention",
        "Conseiller en prévention",
      ],
      correctActors: ["carsat", "dreets", "cnam", "spst", "iprp"],
      wrongActors: ["employeur", "medecin", "salarie"],
    },
  },
]

const megaQuizQuestions = [
  {
    question: "Quelle est l'obligation principale de l'employeur en matière de SSCT ?",
    options: [
      "Organiser des réunions mensuelles",
      "Assurer la sécurité et protéger la santé des travailleurs",
      "Acheter des équipements coûteux",
      "Embaucher un médecin du travail",
    ],
    correct: 1,
  },
  {
    question: "À partir de combien de salariés le CSE est-il obligatoire ?",
    options: ["5 salariés", "11 salariés", "20 salariés", "50 salariés"],
    correct: 1,
  },
  {
    question: "Le médecin du travail peut-il prescrire des arrêts de travail ?",
    options: [
      "Oui, dans tous les cas",
      "Non, jamais",
      "Seulement en cas d'urgence",
      "Seulement avec l'accord de l'employeur",
    ],
    correct: 1,
  },
  {
    question: "Que doit faire un salarié face à un danger grave et imminent ?",
    options: [
      "Continuer son travail normalement",
      "Exercer son droit de retrait",
      "Attendre les instructions",
      "Prévenir uniquement son manager",
    ],
    correct: 1,
  },
  {
    question: "Le salarié compétent est obligatoire dans les entreprises de :",
    options: ["Plus de 10 salariés", "Plus de 20 salariés", "Moins de 50 salariés", "Plus de 100 salariés"],
    correct: 2,
  },
  {
    question: "La CARSAT peut-elle imposer des mesures correctives ?",
    options: [
      "Non, elle ne fait que conseiller",
      "Oui, elle a un pouvoir de contrainte",
      "Seulement avec l'accord de l'entreprise",
      "Seulement en cas d'accident",
    ],
    correct: 1,
  },
  {
    question: "Les IPRP sont des spécialistes en :",
    options: [
      "Médecine du travail uniquement",
      "Prévention des risques professionnels",
      "Droit du travail",
      "Gestion des ressources humaines",
    ],
    correct: 1,
  },
  {
    question: "Le référent handicap est obligatoire dans les entreprises de :",
    options: ["Plus de 20 salariés", "Plus de 50 salariés", "Plus de 100 salariés", "Plus de 250 salariés"],
    correct: 3,
  },
  {
    question: "L'infirmier du travail peut-il réaliser des visites médicales ?",
    options: [
      "Oui, toutes les visites",
      "Non, aucune visite",
      "Seulement les entretiens infirmiers",
      "Seulement en urgence",
    ],
    correct: 2,
  },
  {
    question: "La DREETS intervient principalement pour :",
    options: [
      "Soigner les salariés",
      "Contrôler et faire respecter la réglementation",
      "Former les entreprises",
      "Vendre des équipements",
    ],
    correct: 1,
  },
]

interface GameState {
  unlockedBuildings: string[]
  completedQuizzes: Record<string, { answers: string[]; isCorrect: boolean }>
  megaQuizCompleted: boolean
  megaQuizScore: number
}

const STORAGE_KEY = "ssct-game-progress"

export default function SSCTInteractiveMap() {
  const [unlockedBuildings, setUnlockedBuildings] = useState<string[]>(["direction"])
  const [selectedBuilding, setSelectedBuilding] = useState<NgsBuilding | null>(null)
  const [buildingQuizAnswers, setBuildingQuizAnswers] = useState<string[]>([])
  const [showBuildingQuizResult, setShowBuildingQuizResult] = useState(false)
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null)
  const [gameMode, setGameMode] = useState<"map" | "megaquiz">("map")
  const [megaQuizIndex, setMegaQuizIndex] = useState(0)
  const [megaQuizAnswer, setMegaQuizAnswer] = useState<number | null>(null)
  const [megaQuizScore, setMegaQuizScore] = useState(0)
  const [showMegaQuizResult, setShowMegaQuizResult] = useState(false)
  const [megaQuizCompleted, setMegaQuizCompleted] = useState(false)
  const [showActorInfo, setShowActorInfo] = useState(false)
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, { answers: string[]; isCorrect: boolean }>>(
    {},
  )

  // Charger la progression depuis localStorage au démarrage
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY)
    if (savedProgress) {
      try {
        const gameState: GameState = JSON.parse(savedProgress)
        setUnlockedBuildings(gameState.unlockedBuildings)
        setCompletedQuizzes(gameState.completedQuizzes)
        setMegaQuizCompleted(gameState.megaQuizCompleted)
        setMegaQuizScore(gameState.megaQuizScore)
      } catch (error) {
        console.error("Erreur lors du chargement de la progression:", error)
      }
    }
  }, [])

  // Sauvegarder la progression dans localStorage
  const saveProgress = (newState: Partial<GameState>) => {
    const currentState: GameState = {
      unlockedBuildings,
      completedQuizzes,
      megaQuizCompleted,
      megaQuizScore,
      ...newState,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState))
  }

  const handleBuildingClick = (building: NgsBuilding) => {
    if (unlockedBuildings.includes(building.id)) {
      setSelectedBuilding(building)

      // Charger les réponses précédentes si elles existent
      const previousQuiz = completedQuizzes[building.id]
      if (previousQuiz) {
        setBuildingQuizAnswers(previousQuiz.answers)
        setShowBuildingQuizResult(true)
        setShowActorInfo(previousQuiz.isCorrect)
      } else {
        setBuildingQuizAnswers([])
        setShowBuildingQuizResult(false)
        setShowActorInfo(false)
      }
    }
  }

  const getShuffledActors = (building: NgsBuilding) => {
    // Créer un ordre fixe basé sur l'ID du bâtiment pour éviter les mouvements
    const allActors = [...building.quiz.correctActors, ...building.quiz.wrongActors]
    const seed = building.id.split("").reduce((a, b) => a + b.charCodeAt(0), 0)
    const shuffled = [...allActors]

    // Mélange déterministe basé sur l'ID du bâtiment
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (seed + i) % (i + 1)
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled
  }

  const handleBuildingQuizSubmit = () => {
    if (!selectedBuilding) return

    const correctAnswers = selectedBuilding.quiz.correctActors
    const isCorrect =
      buildingQuizAnswers.length === correctAnswers.length &&
      correctAnswers.every((actor) => buildingQuizAnswers.includes(actor))

    setShowBuildingQuizResult(true)

    // Sauvegarder les réponses du quiz
    const newCompletedQuizzes = {
      ...completedQuizzes,
      [selectedBuilding.id]: { answers: buildingQuizAnswers, isCorrect },
    }
    setCompletedQuizzes(newCompletedQuizzes)

    if (isCorrect) {
      setShowActorInfo(true)
      // Débloquer le prochain bâtiment
      const currentIndex = buildingsData.findIndex((b) => b.id === selectedBuilding.id)
      if (currentIndex < buildingsData.length - 1) {
        const nextBuilding = buildingsData[currentIndex + 1]
        const newUnlockedBuildings = [...unlockedBuildings, nextBuilding.id]
        setUnlockedBuildings(newUnlockedBuildings)

        // Sauvegarder la progression
        saveProgress({
          unlockedBuildings: newUnlockedBuildings,
          completedQuizzes: newCompletedQuizzes,
        })
      }
    } else {
      // Sauvegarder même si incorrect
      saveProgress({
        completedQuizzes: newCompletedQuizzes,
      })
    }
  }

  const resetQuiz = (buildingId: string) => {
    const newCompletedQuizzes = { ...completedQuizzes }
    delete newCompletedQuizzes[buildingId]
    setCompletedQuizzes(newCompletedQuizzes)

    setBuildingQuizAnswers([])
    setShowBuildingQuizResult(false)
    setShowActorInfo(false)

    // Sauvegarder la progression
    saveProgress({
      completedQuizzes: newCompletedQuizzes,
    })
  }

  const handleMegaQuizAnswer = () => {
    if (megaQuizAnswer === null) return

    const isCorrect = megaQuizAnswer === megaQuizQuestions[megaQuizIndex].correct
    if (isCorrect) {
      setMegaQuizScore((prev) => prev + 1)
    }

    setShowMegaQuizResult(true)

    setTimeout(() => {
      if (megaQuizIndex < megaQuizQuestions.length - 1) {
        setMegaQuizIndex((prev) => prev + 1)
        setMegaQuizAnswer(null)
        setShowMegaQuizResult(false)
      } else {
        setMegaQuizCompleted(true)
        saveProgress({
          megaQuizCompleted: true,
          megaQuizScore,
        })
      }
    }, 2000)
  }

  const toggleActorSelection = (actorId: string) => {
    setBuildingQuizAnswers((prev) =>
      prev.includes(actorId) ? prev.filter((id) => id !== actorId) : [...prev, actorId],
    )
  }

  const getActorById = (id: string) => actorsData.find((actor) => actor.id === id)

  const allBuildingsUnlocked = unlockedBuildings.length === buildingsData.length

  const getRandomColor = (actorId: string, buildingId: string) => {
    const colors = [
      "bg-blue-600",
      "bg-green-600",
      "bg-red-600",
      "bg-purple-600",
      "bg-yellow-600",
      "bg-pink-600",
      "bg-indigo-600",
      "bg-orange-600",
      "bg-teal-600",
      "bg-cyan-600",
      "bg-lime-600",
      "bg-emerald-600",
      "bg-violet-600",
      "bg-fuchsia-600",
      "bg-rose-600",
    ]

    // Créer une seed plus complexe pour éviter les patterns
    const complexSeed =
      actorId.split("").reduce((acc, char, index) => {
        return acc + char.charCodeAt(0) * (index + 1) * 7
      }, 0) +
      buildingId.split("").reduce((acc, char, index) => {
        return acc + char.charCodeAt(0) * (index + 1) * 13
      }, 0)

    // Ajouter plus de randomisation
    const finalSeed = (complexSeed * 31 + actorId.length * buildingId.length * 17) % colors.length

    return colors[Math.abs(finalSeed) % colors.length]
  }

  const resetAllProgress = () => {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-blue-100 to-green-200 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4 px-2">
            🏢 Campus SSCT - Parcours des acteurs
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 px-2">
            Saurez-vous identifier les acteurs de la SSCT en passant les niveaux jusqu'au défi final ?
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2">
            <Button
              onClick={() => setGameMode("map")}
              variant={gameMode === "map" ? "default" : "outline"}
              size="sm"
              className="sm:size-default min-h-[44px]"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Niveau ({unlockedBuildings.length}/{buildingsData.length})
            </Button>
            <Button
              onClick={() => setGameMode("megaquiz")}
              variant={gameMode === "megaquiz" ? "default" : "outline"}
              disabled={!allBuildingsUnlocked}
              size="sm"
              className="sm:size-default min-h-[44px]"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Défi Final {allBuildingsUnlocked ? "🔓" : "🔒"}
            </Button>
            <Button onClick={resetAllProgress} variant="outline" size="sm" className="min-h-[44px] bg-transparent">
              <RotateCcw className="w-4 h-4 mr-2" />
              Recommencer
            </Button>
          </div>

          <div className="max-w-md mx-auto mb-4 sm:mb-6 px-4">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
              <span>Progression</span>
              <span>
                {unlockedBuildings.length} / {buildingsData.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 sm:h-3 rounded-full transition-all duration-500 flex items-center justify-end pr-1"
                style={{ width: `${(unlockedBuildings.length / buildingsData.length) * 100}%` }}
              >
                {unlockedBuildings.length === buildingsData.length && (
                  <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                )}
              </div>
            </div>
          </div>
        </div>

        {gameMode === "map" ? (
          <Card className="w-full h-[500px] sm:h-[600px] lg:h-[800px] relative overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="relative w-full h-full">
                {/* Image de fond */}
                <Image
                  src="/images/background_with_single_road.png"
                  alt="Campus background with road"
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 shadow-lg z-10 text-xs sm:text-sm max-w-[140px] sm:max-w-none">
                  <h3 className="font-semibold mb-1 sm:mb-2 lg:mb-3 text-gray-800">Progression</h3>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs lg:text-sm">Déverrouillé</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                      <span className="text-[10px] sm:text-xs lg:text-sm">Verrouillé</span>
                    </div>
                  </div>
                </div>

                {buildingsData.map((building, index) => {
                  const isUnlocked = unlockedBuildings.includes(building.id)
                  const isLocked = !isUnlocked
                  return (
                    <div
                      key={building.id}
                      className={`absolute transition-all duration-300 ${
                        hoveredBuilding === building.id && !isLocked ? "scale-110 z-20" : "z-10"
                      } ${isLocked ? "opacity-40 grayscale cursor-not-allowed" : "cursor-pointer active:scale-95"}`}
                      style={{
                        left: `${building.position.x}%`,
                        top: `${building.position.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      onMouseEnter={() => setHoveredBuilding(building.id)}
                      onMouseLeave={() => setHoveredBuilding(null)}
                      onClick={() => !isLocked && handleBuildingClick(building)}
                    >
                      <div className="relative">
                        <Image
                          src={building.imagePath || "/placeholder.svg"}
                          alt={building.name}
                          width={100}
                          height={100}
                          className="drop-shadow-lg w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] lg:w-[130px] lg:h-[130px]"
                        />

                        {/* Cadenas si verrouillé */}
                        {isLocked && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/70 rounded-full p-2 sm:p-3 lg:p-4">
                              <Lock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="mt-1 sm:mt-2 text-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 shadow-md min-w-[60px] sm:min-w-[80px]">
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            {isUnlocked ? (
                              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                            ) : (
                              <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                            )}
                            <span className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-800 whitespace-nowrap">
                              Niveau {index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-[95vw] sm:max-w-4xl mx-auto">
            <CardContent className="p-3 sm:p-6 lg:p-8">
              {!megaQuizCompleted ? (
                <div>
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">🏆 Défi Final</h2>
                      <Badge variant="outline" className="self-start sm:self-auto text-xs sm:text-sm">
                        Question {megaQuizIndex + 1}/{megaQuizQuestions.length}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((megaQuizIndex + 1) / megaQuizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 leading-relaxed">
                      {megaQuizQuestions[megaQuizIndex].question}
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {megaQuizQuestions[megaQuizIndex].options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-start gap-2 sm:gap-3 cursor-pointer p-3 sm:p-3 lg:p-4 rounded-lg hover:bg-white/50 transition-colors active:scale-98 min-h-[48px]"
                        >
                          <input
                            type="radio"
                            name="megaquiz"
                            value={index}
                            checked={megaQuizAnswer === index}
                            onChange={() => setMegaQuizAnswer(index)}
                            className="text-purple-600 mt-0.5 flex-shrink-0 w-4 h-4"
                          />
                          <span className="text-sm sm:text-base leading-relaxed">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {!showMegaQuizResult && (
                    <Button
                      onClick={handleMegaQuizAnswer}
                      disabled={megaQuizAnswer === null}
                      size="lg"
                      className="w-full min-h-[48px] text-sm sm:text-base"
                    >
                      Valider la réponse
                    </Button>
                  )}

                  {showMegaQuizResult && (
                    <div
                      className={`p-3 sm:p-4 rounded-lg ${
                        megaQuizAnswer === megaQuizQuestions[megaQuizIndex].correct
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {megaQuizAnswer === megaQuizQuestions[megaQuizIndex].correct ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium text-sm sm:text-base">Bonne réponse ! +1 point</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <X className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">Réponse incorrecte</span>
                          </div>
                          <p className="text-xs sm:text-sm leading-relaxed">
                            La bonne réponse était :{" "}
                            {megaQuizQuestions[megaQuizIndex].options[megaQuizQuestions[megaQuizIndex].correct]}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Score actuel : {megaQuizScore}/{megaQuizIndex + (showMegaQuizResult ? 1 : 0)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4">🎉 Félicitations !</h2>
                  <p className="text-base sm:text-xl mb-4 px-2">
                    Vous avez terminé le parcours SSCT avec un score de {megaQuizScore}/{megaQuizQuestions.length}
                  </p>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4 sm:p-6 mb-6">
                    <h3 className="font-semibold mb-2 text-sm sm:text-base">Votre performance :</h3>
                    <div className="text-xl sm:text-2xl font-bold text-yellow-600">
                      {Math.round((megaQuizScore / megaQuizQuestions.length) * 100)}%
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      {megaQuizScore >= 8
                        ? "Excellent ! 🌟"
                        : megaQuizScore >= 6
                          ? "Bien joué ! 👍"
                          : "Continuez vos efforts ! 💪"}
                    </p>
                  </div>
                  <Button onClick={resetAllProgress} size="lg" className="min-h-[48px]">
                    Recommencer le parcours
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Dialog
          open={selectedBuilding !== null}
          onOpenChange={() => {
            setSelectedBuilding(null)
            setShowActorInfo(false)
          }}
        >
          <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedBuilding && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                    Quiz - Niveau {buildingsData.findIndex((b) => b.id === selectedBuilding.id) + 1}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h3 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base leading-relaxed">
                      {selectedBuilding.quiz.question}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-xs sm:text-sm text-gray-600 mb-2">Missions à associer :</p>
                      {selectedBuilding.quiz.missions.map((mission, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-xs sm:text-sm leading-relaxed">{mission}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-sm sm:text-base">
                      Sélectionnez {selectedBuilding.quiz.correctActors.length === 1 ? "l'acteur" : "les acteurs"}{" "}
                      concerné{selectedBuilding.quiz.correctActors.length === 1 ? "" : "s"} :
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                      {getShuffledActors(selectedBuilding).map((actorId) => {
                        const actor = getActorById(actorId)
                        const isSelected = buildingQuizAnswers.includes(actorId)
                        return actor ? (
                          <div
                            key={actorId}
                            className={`${getRandomColor(actorId, selectedBuilding.id)} text-white rounded-lg p-3 sm:p-3 lg:p-4 cursor-pointer transition-all duration-200 min-h-[72px] sm:min-h-[80px] active:scale-95 ${
                              isSelected ? "ring-2 sm:ring-4 ring-yellow-400 scale-105" : "hover:scale-102"
                            }`}
                            onClick={() => toggleActorSelection(actorId)}
                          >
                            <div className="flex items-center gap-1 sm:gap-2 mb-1.5 sm:mb-2">
                              <div className="flex-shrink-0">{actor.icon}</div>
                              <span className="text-xs sm:text-sm font-medium leading-tight">{actor.name}</span>
                            </div>
                            <Badge
                              variant={actor.category === "internal" ? "default" : "secondary"}
                              className="text-[10px] sm:text-xs"
                            >
                              {actor.category === "internal" ? "Interne" : "Externe"}
                            </Badge>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>

                  {!showBuildingQuizResult && (
                    <Button
                      onClick={handleBuildingQuizSubmit}
                      disabled={buildingQuizAnswers.length === 0}
                      className="w-full min-h-[48px]"
                      size="default"
                    >
                      Valider ma sélection
                    </Button>
                  )}

                  {showBuildingQuizResult && (
                    <div
                      className={`p-3 sm:p-4 rounded-lg ${
                        buildingQuizAnswers.length === selectedBuilding.quiz.correctActors.length &&
                        selectedBuilding.quiz.correctActors.every((actor) => buildingQuizAnswers.includes(actor))
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {buildingQuizAnswers.length === selectedBuilding.quiz.correctActors.length &&
                      selectedBuilding.quiz.correctActors.every((actor) => buildingQuizAnswers.includes(actor)) ? (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">
                              Bonne réponse ! Bâtiment suivant déverrouillé ! 🎉
                            </span>
                          </div>

                          {/* Informations détaillées sur les acteurs */}
                          {showActorInfo && (
                            <div className="mt-4 space-y-3">
                              <h4 className="font-semibold text-sm sm:text-base border-b border-green-300 pb-1">
                                📋 Informations détaillées :
                              </h4>
                              {selectedBuilding.quiz.correctActors.map((actorId) => {
                                const actor = getActorById(actorId)
                                return actor ? (
                                  <div key={actorId} className="bg-white/50 rounded-lg p-3 border border-green-200">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                      <div className="flex-shrink-0">{actor.icon}</div>
                                      <h5 className="font-semibold text-xs sm:text-sm">{actor.name}</h5>
                                      <Badge
                                        variant={actor.category === "internal" ? "default" : "secondary"}
                                        className="text-[10px] sm:text-xs"
                                      >
                                        {actor.category === "internal" ? "Interne" : "Externe"}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-700 mb-2 leading-relaxed">{actor.description}</p>
                                    <div className="space-y-1">
                                      <p className="text-xs font-medium">Missions principales :</p>
                                      {actor.missions.slice(0, 3).map((mission, idx) => (
                                        <div key={idx} className="flex items-start gap-1">
                                          <span className="text-xs text-green-600 flex-shrink-0">•</span>
                                          <span className="text-xs leading-relaxed">{mission}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : null
                              })}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <X className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="font-medium text-sm sm:text-base">Réponse incorrecte</span>
                          </div>
                          <p className="text-xs sm:text-sm mb-2 leading-relaxed">
                            {selectedBuilding.quiz.correctActors.length === 1
                              ? "La bonne réponse était l'acteur :"
                              : "Les bonnes réponses étaient les acteurs :"}
                          </p>
                          <div className="flex flex-wrap gap-1 sm:gap-2 mb-3">
                            {selectedBuilding.quiz.correctActors.map((actorId) => {
                              const actor = getActorById(actorId)
                              return actor ? (
                                <Badge key={actorId} variant="outline" className="text-xs">
                                  {actor.name}
                                </Badge>
                              ) : null
                            })}
                          </div>
                          <Button
                            onClick={() => resetQuiz(selectedBuilding.id)}
                            variant="outline"
                            size="default"
                            className="w-full min-h-[44px]"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Réessayer ce quiz
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
