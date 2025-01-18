import React, {useEffect, useMemo, useState} from "react";
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    Container,
    Card,
    CardHeader,
    CardContent,
    Collapse,
    IconButton,
    Typography,
    Box,
    Button, TextField, InputAdornment,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// ------------------ DATA MODELS ------------------
type TGame = {
    name: string;
    link?: string;
    description: string;
};

type TGradivo = {
    name: string;
    games: TGame[];

    isSearchMode?: boolean
};

type TRazred = {
    name: string;
    gradivo: TGradivo[];

    isSearchMode?: boolean
};

type TSubject = {
    name: string,
    razredi: TRazred[],

    isSearchMode?: boolean
};

// ------------------ DATA ------------------
const SUBJECTS: TSubject[] = [
    {
        name: "Fizika",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Uvod u Fiziku",
                        games: [
                            {
                                name: "Što je fizika?",
                                description:
                                    'Igra: "Physionary - a scientific version of Pictionary"\nOpis: "Physionary" je znanstvena verzija igre Pictionary, prilagođena za fizikalne pojmove. Studenti crtaju i pogađaju pojmove, što im pomaže u boljem razumijevanju osnovnih koncepata fizike.',
                            },
                            {
                                name: "Fizikalne veličine i mjerenje",
                                link: "https://planeta42.com/physics/measureunits/game.html",
                                description:
                                    "Measure Units Puzzle – Ova edukativna igra omogućuje učenicima povezivanje osnovnih metričkih jedinica s odgovarajućim fizikalnim veličinama, pomažući im u razumijevanju mjernih jedinica i njihovih primjena.",
                            },
                            {
                                name: "Jedinice i dimenzije veličina",
                                link: "https://www.eslgamesplus.com/si-units-and-measurement-science-game/",
                                description:
                                    "SI Units and Measurement, Science Game – Interaktivna igra za testiranje znanja o osnovnim SI jedinicama i njihovim primjenama.",
                            },
                            {
                                name: "Pogreške u mjerenju",
                                description: "(Nema linka, samo naslov poglavlja / gradiva.)",
                            },
                        ],
                    },
                    {
                        name: "Kinematika",
                        games: [
                            {
                                name: "Gibanje i vrste gibanja, Brzina i ubrzanje, Jednoliko i jednoliko ubrzano gibanje",
                                link: "https://phet.colorado.edu/en/simulations/maze-game",
                                description:
                                    "Maze Game – Interaktivna igra za razumijevanje pojmova gibanja, brzine i ubrzanja.",
                            },
                            {
                                name: "Golf acceleration and velocity",
                                link: "https://www.mrmont.com/games/golfer-3d.html",
                                description:
                                    "Simulacija koja omogućuje proučavanje gibanja projektila kroz različite parametre poput kutova ispaljivanja i brzina.",
                            },
                            {
                                name: "Projectile Game",
                                link: "https://phet.colorado.edu/sims/html/projectile-data-lab/latest/projectile-data-lab_all.html",
                                description:
                                    "Interaktivna simulacija za istraživanje kinematike projektila: mijenjanje brzine, kuta lansiranja i gravitacije te promatranje putanje.",
                            },
                            {
                                name: "Slobodni pad",
                                link: "https://iwant2study.org/lookangejss/02_newtonianmechanics_2kinematics/ejss_model_freefall01/",
                                description:
                                    "Slobodni Pad – Simulacija koja omogućuje eksperimentiranje s gravitacijom i raznim otporima zraka.",
                            },
                        ],
                    },
                    {
                        name: "Dinamika",
                        games: [
                            {
                                name: "Newtonovi zakoni gibanja - Newton’s Golf Island",
                                link: "https://app.legendsoflearning.com/assignments/1ad3dd2a/newtons-laws-of-motion",
                                description:
                                    "Igra primjene Newtonovih zakona gibanja kako bi se loptica dovela u rupu na golf terenu.",
                            },
                            {
                                name: "Blueprint Bash: Newton's 1st & 2nd Laws",
                                link: "https://app.legendsoflearning.com/assignments/2470444e/newtons-apple-blue-print-bash-newtons-first-and-second-laws-ps2-a-2-assignment",
                                description:
                                    "Igra za primjenu Newtonovih zakona kroz gradnju i simulaciju pokreta u stvarnim scenarijima.",
                            },
                            {
                                name: "Sila i njene vrste - Gravity Force Basics",
                                link: "https://phet.colorado.edu/en/simulations/gravity-force-lab-basics",
                                description:
                                    "Simulacija istraživanja gravitacijskih sila između dvaju tijela – prilagođavanje mase i udaljenosti te promatranje rezultirajuće sile.",
                            },
                            {
                                name: "Forces and Motion",
                                link: "https://phet.colorado.edu/en/simulations/forces-and-motion-basics",
                                description:
                                    "Interaktivna simulacija za proučavanje kako sile djeluju na objekte, uz podešavanje mase, trenja i primijenjene sile.",
                            },
                            {
                                name: "Sila trenja - Fish Force",
                                link: "https://pbskids.org/ruff/games/fish-force",
                                description:
                                    "Igra u kojoj učenici koriste koncept sile trenja za pomaganje ribicama pri prelasku prepreka.",
                            },
                            {
                                name: "Car Friction Game",
                                link: "https://www.sciencekids.co.nz/gamesactivities/friction.html",
                                description:
                                    "Simulacija trenja na kotačima automobila s različitim vrstama površina.",
                            },
                            {
                                name: "Kružno gibanje i centripetalna sila - Uniform circular motion",
                                link: "https://www.physicsclassroom.com/Physics-Interactives/Circular-and-Satellite-Motion/Uniform-Circular-Motion/Uniform-Circular-Motion-Interactive",
                                description:
                                    "Simulacija istraživanja kružnog gibanja te odnosa između brzine, radijusa i centripetalne sile.",
                            },
                            {
                                name: "Gravity and Orbits",
                                link: "https://phet.colorado.edu/sims/html/gravity-and-orbits/latest/gravity-and-orbits_all.html",
                                description:
                                    "Istraživanje gravitacije u stvaranju orbita – prilagođavanje mase tijela, brzine i udaljenosti.",
                            },
                        ],
                    },
                    {
                        name: "Energija",
                        games: [
                            {
                                name: "Rad i energija / Kinetička i potencijalna energija",
                                link: "https://phet.colorado.edu/en/simulations/energy-skate-park-basics",
                                description:
                                    "Energy Skate Park – Vizualizacija pretvorbe kinetičke i potencijalne energije uz skejtera i staze.",
                            },
                            {
                                name: "Zakon očuvanja energije - Energy Forms and Changes",
                                link: "https://phet.colorado.edu/en/simulations/energy-forms-and-changes",
                                description:
                                    "Simulacija prijelaza energije među različitim oblicima (toplinska, svjetlosna, kinetička, potencijalna).",
                            },
                            {
                                name: "Snaga i učinkovitost",
                                description: "(Nema linka, samo naslov poglavlja / gradiva.)",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Termodinamika",
                        games: [
                            {
                                name: "Toplina i temperatura",
                                link: "https://www.eslgamesplus.com/heat-and-temperature-physical-science-game/",
                                description:
                                    "Heat and Temperature Quiz Game – Kviz igra o razlikama između topline i temperature.",
                            },
                            {
                                name: "Širenje tvari pri zagrijavanju - States Matter",
                                link: "https://phet.colorado.edu/en/simulations/states-of-matter-basics",
                                description:
                                    "Istraživanje agregatnih stanja tvari i promjena pri različitim temperaturama.",
                            },
                            {
                                name: "Gas properties",
                                link: "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_all.html",
                                description:
                                    "Simulacija istraživanja svojstava plinova (tlak, volumen, temperatura).",
                            },
                            {
                                name: "Toplinski kapacitet i kalorimetrija - Interactive Heat Transfer",
                                link: "https://energy.concord.org/energy2d/",
                                description:
                                    "Interaktivna simulacija za proučavanje prijenosa topline i učinaka na različite materijale.",
                            },
                            {
                                name: "Zakoni termodinamike",
                                description: "(Nema linka, samo naslov poglavlja / gradiva.)",
                            },
                        ],
                    },
                    {
                        name: "Elektrostatika",
                        games: [
                            {
                                name: "Električni naboj i Coulombov zakon - Coulomb lab",
                                link: "https://phet.colorado.edu/sims/html/coulombs-law/latest/coulombs-law_all.html",
                                description:
                                    "Simulacija proučavanja Coulombova zakona i interakcije među električnim nabojima.",
                            },
                            {
                                name: "Električno polje i električni potencijal - Electric Field Hockey",
                                link: "https://phet.colorado.edu/en/simulations/electric-hockey",
                                description:
                                    "Edukativna igra koja prikazuje utjecaj električnih polja na nabijenu česticu (hokejska pak).",
                            },
                            {
                                name: "Kondenzatori i kapacitet - Capacitor Lab",
                                link: "https://phet.colorado.edu/sims/html/capacitor-lab-basics/latest/capacitor-lab-basics_all.html",
                                description:
                                    "Istraživanje rada kondenzatora: prilagodba kapaciteta, napona i materijala dielektrika.",
                            },
                        ],
                    },
                    {
                        name: "Električni tok",
                        games: [
                            {
                                name: "Električna struja i otpor - Resistance in a Wire",
                                link: "https://phet.colorado.edu/sims/html/resistance-in-a-wire/latest/resistance-in-a-wire_all.html",
                                description:
                                    "Interaktivna simulacija: kako duljina, debljina i vrsta materijala žice utječu na otpor.",
                            },
                            {
                                name: "Ohmov zakon - Ohm lab",
                                link: "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_all.html",
                                description:
                                    "Simulacija osnovnih principa Ohmovog zakona (utjecaj napona, otpora na struju).",
                            },
                            {
                                name: "Serijsko i paralelno spajanje otpornika - Crack the Cicruit",
                                link: "https://universeandmore.com/crack-the-circuit/",
                                description:
                                    "Igra za razumijevanje kako različite konfiguracije otpornika utječu na ukupni otpor i struju.",
                            },
                            {
                                name: "Combinations",
                                link: "https://www.walter-fendt.de/html5/phen/combinationrlc_en.htm",
                                description:
                                    "Simulacija koja prikazuje kako se ukupni otpor mijenja pri različitim kombinacijama otpornika.",
                            },
                            {
                                name: "Rad i snaga električne struje",
                                description: "(Nema linka, samo naslov poglavlja / gradiva.)",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Magnetizam",
                        games: [
                            {
                                name: "Magnetno polje i njegovi izvori - Charges and Fields",
                                link: "https://phet.colorado.edu/en/simulations/charges-and-fields",
                                description:
                                    "Simulacija o tome kako električni naboji stvaraju električna polja.",
                            },
                            {
                                name: "Magnet Maze",
                                link: "https://games.legendsoflearning.com/game/WyJnYW1lcyIsMzQxMV0=/3411?partner=legends-public",
                                description:
                                    "Igra u kojoj učenici istražuju osnove magnetizma kroz zabavan labirint.",
                            },
                            {
                                name: "Zemljino magnetno polje",
                                description: "(Nema linka, samo naslov poglavlja / gradiva.)",
                            },
                            {
                                name: "Magnetno polje vodiča s električnom strujom - Wire Magnetic Field Lab",
                                link: "https://javalab.org/en/magnetic_field_around_a_wire_en/",
                                description:
                                    "Istraživanje kako električna struja stvara magnetsko polje oko vodiča.",
                            },
                            {
                                name: "Sila na vodič u magnetnom polju - Magnetic Force Challenge",
                                link: "https://thephysicsaviary.com/Physics/Programs/Games/MagneticForceChallenge/",
                                description:
                                    "Igra istraživanja magnetske sile na vodiče s električnom strujom.",
                            },
                        ],
                    },
                    {
                        name: "Elektromagnetska indukcija",
                        games: [
                            {
                                name: "Faradayev zakon indukcije - Faradays magnetic lab",
                                link: "https://games.legendsoflearning.com/game/WyJnYW1lcyIsNDM1OF0=/4358?partner=legends-public",
                                description:
                                    "Igra o Faradayevom zakonu indukcije i stvaranju struje promjenom magnetskog polja.",
                            },
                            {
                                name: "Samoindukcija i transformatori",
                                description: "(Nema linka, samo naslov poglavlja / gradiva.)",
                            },
                        ],
                    },
                    {
                        name: "Oscilacije i valovi",
                        games: [
                            {
                                name: "Harmonijsko osciliranje - Resonance",
                                link: "https://phet.colorado.edu/en/simulations/resonance",
                                description:
                                    "Simulacija istraživanja rezonancije i harmonijskog osciliranja.",
                            },
                            {
                                name: "Force Oscillations",
                                link: "https://www.walter-fendt.de/html5/phen/resonance_en.htm",
                                description:
                                    "Simulacija kako različite sile utječu na amplitude oscilirajućih sustava.",
                            },
                            {
                                name: "Valovi – vrste i svojstva - Waves",
                                link: "https://theyardgames.org/game/waves.html",
                                description:
                                    "Edukativna igra za istraživanje svojstava valova (frekvencija, amplituda, brzina).",
                            },
                            {
                                name: "Wave on a String",
                                link: "https://phet.colorado.edu/en/simulations/wave-on-a-string",
                                description:
                                    "Simulacija putovanja valova duž žice, prilagodba amplitude, frekvencije i napetosti.",
                            },
                            {
                                name: "Zvuk – akustika - Sound Waves",
                                link: "https://phet.colorado.edu/sims/html/sound-waves/latest/sound-waves_all.html",
                                description:
                                    "Istraživanje zvučnih valova kroz različite medije i manipulacija frekvencijom/amplitudom.",
                            },
                            {
                                name: "Doppler Demo",
                                link: "https://www.walter-fendt.de/html5/phen/dopplereffect_en.htm",
                                description:
                                    "Simulacija objašnjava Dopplerov efekt i promjene frekvencije pri kretanju izvora/promatrača.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Optika",
                        games: [
                            {
                                name: "Priroda svjetlosti - Optics and Light, Physical Science Game",
                                link: "https://www.eslgamesplus.com/optics-and-light-physical-science-game/",
                                description:
                                    "Istraživanje osnovnih koncepata svjetlosti i optike (refleksija, refrakcija).",
                            },
                            {
                                name: "Zrcala i leće - Geometric Optics",
                                link: "https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_all.html",
                                description:
                                    "Manipulacija različitim vrstama leća i zrcala za proučavanje refleksije i loma svjetlosti.",
                            },
                            {
                                name: "Loma svjetlosti i optički instrumenti - Light Bending",
                                link: "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_all.html",
                                description:
                                    "Simulacija loma svjetlosti pri prijelazu iz jednog medija u drugi.",
                            },
                            {
                                name: "Difrakcija i interferencija - Diffraction of Light by a Single Slit",
                                link: "https://www.walter-fendt.de/html5/phen/singleslit_en.htm",
                                description:
                                    "Simulacija difrakcije svjetlosti na uskoj pukotini i nastajanje difrakcijskog uzorka.",
                            },
                            {
                                name: "Interference of Light at a Double Slit",
                                link: "https://www.walter-fendt.de/html5/phen/doubleslit_en.htm",
                                description:
                                    "Istraživanje difrakcijskih uzoraka pri prolasku svjetlosti kroz dvostruku pukotinu.",
                            },
                        ],
                    },
                    {
                        name: "Moderna fizika",
                        games: [
                            {
                                name: "Fotoelektrični efekt - Photoelectic Effect",
                                link: "https://phet.colorado.edu/sims/cheerpj/photoelectric/latest/photoelectric.html?simulation=photoelectric",
                                description:
                                    "Simulacija koja prikazuje emisiju elektrona s metalne površine i ovisnost o frekvenciji svjetlosti.",
                            },
                            {
                                name: "Teorija relativnosti - Relative Relativity",
                                link: "https://www.refsmmat.com/jsphys/relativity/relativity.html",
                                description:
                                    "Simulacija za istraživanje relativističkih efekata poput dilatacije vremena i kontrakcije duljine.",
                            },
                            {
                                name: "Time Dilation",
                                link: "https://www.walter-fendt.de/html5/phen/timedilation_en.htm",
                                description:
                                    "Simulacija usporavanja vremena pri velikim brzinama (dilatacija vremena).",
                            },
                            {
                                name: "Atomski modeli i spektri - Build an Atom",
                                link: "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_en.html",
                                description:
                                    "Sastavljanje atoma od protona, neutrona i elektrona; razumijevanje atomskih struktura.",
                            },
                            {
                                name: "Nuklearna fizika i radioaktivnost - Gamma Gear",
                                link: "https://www.cnsc-ccsn.gc.ca/eng/resources/learning-portal/gamma-gear-game/",
                                description:
                                    "Istraživanje osnovnih koncepata nuklearne fizike i sigurnosti kod radioaktivnih tvari.",
                            },
                            {
                                name: "Radioactive Decay",
                                link: "https://www.walter-fendt.de/html5/phen/lawdecay_en.htm",
                                description:
                                    "Simulacija koja prikazuje zakon radioaktivnog raspada i praćenje raspada tvari.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Matematika",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Aritmetika i algebra",
                        games: [
                            {
                                name: "Algebra - Polinomi i njihovo računanje",
                                link: "https://www.quia.com/cz/19205.html?AP_rand=1404977518",
                                description:
                                    "Evaluate The Polynomial – Interaktivna kviz-igra za vrednovanje polinoma.",
                            },
                            {
                                name: "Linearne jednadžbe i nejednadžbe, sustav linearnih jednadžbi",
                                link: "https://www.mangahigh.com/en/games/graphsofthegalaxy",
                                description:
                                    "Graphs Of The Galaxy – Igra za razumijevanje linearnog grafa, gradijenta i y-presjeka.",
                            },
                            {
                                name: "Različiti tipovi funkcija (linearne, kvadratne, apsolutne)",
                                link: "https://store.steampowered.com/app/1899700/Graphwar/",
                                description:
                                    "GraphWar – Strategijska igra u kojoj se brane linije crtajući funkcije različitih tipova.",
                            },
                        ],
                    },
                    {
                        name: "Geometrija",
                        games: [
                            {
                                name: "Geometrijske figure - Euclidea",
                                link: "https://www.euclidea.xyz/en/game/packs/Alpha",
                                description:
                                    "Logička i edukativna igra za učenje klasičnih geometrijskih konstrukcija.",
                            },
                            {
                                name: "Kružnice i krugovi - Play With Circle Theorems",
                                link: "https://www.transum.org/software/SW/Circle_Theorems/",
                                description:
                                    "Edukativni alat za učenje teorema kružnica kroz interaktivne zadatke.",
                            },
                        ],
                    },
                    {
                        name: "Trigonometrija",
                        games: [
                            {
                                name: "Osnove u pravokutnom trokutu - Trig Tour",
                                link: "https://phet.colorado.edu/sims/html/trig-tour/latest/trig-tour_all.html",
                                description:
                                    "Interaktivna simulacija za vizualizaciju trigonometrijskih funkcija u pravokutnom trokutu.",
                            },
                            {
                                name: "Trigonometry Quiz",
                                link: "https://www.purposegames.com/game/trigonometry-v2-quiz?l=24088",
                                description:
                                    "Kviz-igra za provjeru znanja sinusa, kosinusa, tangensa i njihove primjene.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Algebra",
                        games: [
                            {
                                name: "Kvadratne funkcije i jednadžbe - Graphing Quadratics",
                                link: "https://phet.colorado.edu/sims/html/graphing-quadratics/latest/graphing-quadratics_all.html",
                                description:
                                    "Simulacija za istraživanje grafova kvadratnih funkcija i utjecaj koeficijenata.",
                            },
                            {
                                name: "Quadratic Angry Birds",
                                link: "https://www.geogebra.org/m/hcFkDwjg",
                                description:
                                    "Edukativna igra temeljena na Angry Birds za razumijevanje paraboličnih putanja.",
                            },
                            {
                                name: "Sustavi linearnih jednadžbi - Systems of Equations Puzzle Game",
                                link: "https://www.geogebra.org/m/xfwkxsfa",
                                description:
                                    "GeoGebra igra za vizualno i algebarsko rješavanje sustava linearnih jednadžbi.",
                            },
                            {
                                name: "Polinomi i racionalne funkcije - Multiplying Polynomials Mystery Breakout",
                                link: "https://view.genially.com/63e67fd4d806be001315d416/interactive-content-multiplying-polynomials-mystery-breakout",
                                description:
                                    "Zabavna igra za vježbanje množenja polinoma i otkrivanje tajne poruke.",
                            },
                        ],
                    },
                    {
                        name: "Geometrija",
                        games: [
                            {
                                name: "Sličnost trokuta - Similar Triangles Game",
                                link: "https://www.geogebra.org/m/rv7wrequ",
                                description:
                                    "Istraživanje različitih slučajeva sličnosti trokuta (KK, SKS, SSS).",
                            },
                            {
                                name: "Pravci i ravnine u prostoru - 3D Calculator",
                                link: "https://www.geogebra.org/3d",
                                description:
                                    "Alat za vizualizaciju 3D geometrije: pravci, ravnine, točke i njihove međusobne udaljenosti.",
                            },
                        ],
                    },
                    {
                        name: "Trigonometrija",
                        games: [
                            {
                                name: "Trigonometrijske funkcije u općem trokutu - Rocket Angles",
                                link: "https://www.mathplayground.com/rocket_angles.html",
                                description:
                                    "Igra lansiranja rakete uz precizno mjerenje kutova i trigonometriju u širem kontekstu.",
                            },
                        ],
                    },
                    {
                        name: "Vjerojatnost",
                        games: [
                            {
                                name: "Osnove vjerojatnosti - Plinko Probability",
                                link: "https://phet.colorado.edu/sims/html/plinko-probability/latest/plinko-probability_all.html",
                                description: "Simulacija pada diska kroz čavliće i rasap ishoda.",
                            },
                            {
                                name: "Probability Fair - Online Game",
                                link: "https://mrnussbaum.com/probability-fair-online-game",
                                description:
                                    "Igra o slučajnosti i ishodima za uvježbavanje osnovnih koncepata vjerojatnosti.",
                            },
                            {
                                name: "Kombinatorika (kombinacije, permutacije) - Combinatorics Quiz",
                                link: "https://quizizz.com/admin/quiz/5c7264c2d1ef6a001b2dc1f4/11-specialist-mathematics-ch-7-combinatorics",
                                description:
                                    "Kviz o osnovama kombinatorike, permutacija i faktorizacije.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Algebra",
                        games: [
                            {
                                name: "Eksponencijalne i logaritamske funkcije - Exponential Functions Game",
                                link: "https://quizizz.com/admin/quiz/5c7fe7ec092f5a001a004e78/exponential-functions-game-review-from-sub-work",
                                description:
                                    "Interaktivna igra za usvajanje eksponencijalnih funkcija i njihovih primjena.",
                            },
                            {
                                name: "Logarithms",
                                link: "https://www.transum.org/Maths/Exercise/Logarithms/Default.asp?Level=6",
                                description:
                                    "Vježbe za evaluaciju logaritama i rješavanje logaritamskih jednadžbi.",
                            },
                            {
                                name: "Log War Paper Game",
                                link: "https://mathequalslove.net/log-war/",
                                description:
                                    "Edukativna igra za vježbanje logaritamskih operacija i natjecanje u znanju logaritama.",
                            },
                            {
                                name: "Polinomi višeg stupnja - Polynomial Jeopardy",
                                link: "https://www.quia.com/cb/42458.html",
                                description:
                                    "Kviz u stilu Jeopardy za zadatke s polinomima višeg stupnja.",
                            },
                        ],
                    },
                    {
                        name: "Geometrija",
                        games: [
                            {
                                name: "Analitička geometrija u ravnini - Quiz & Worksheet (Lines, Circles, Parabolas)",
                                link: "https://study.com/academy/practice/quiz-worksheet-systems-of-equations-with-lines-circles-parabolas.html",
                                description:
                                    "Kviz za rješavanje sustava jednadžbi (pravac, kružnica, parabola).",
                            },
                            {
                                name: "Prava i ravnine u prostoru - Cartesian Plane Game — Galaxy Escape Room!",
                                link: "https://www.teachstarter.com/au/teaching-resource/cartesian-plane-game-escape-room/",
                                description:
                                    "Edukativna 'escape room' igra za vježbanje koordinatnog sustava i navigacije u ravnini.",
                            },
                        ],
                    },
                    {
                        name: "Vektori",
                        games: [
                            {
                                name: "Vektori u ravnini i prostoru - Vector Cops",
                                link: "https://www.transum.org/Maths/Puzzles/Vectors/",
                                description:
                                    "Interaktivna igra rješavanja zadataka koristeći vektorsko zbrajanje i oduzimanje.",
                            },
                            {
                                name: "Vector Addition",
                                link: "https://phet.colorado.edu/sims/html/vector-addition/latest/vector-addition_all.html",
                                description:
                                    "Simulacija vektorskog zbrajanja i prikaz rezultante vektora.",
                            },
                            {
                                name: "Vector Addition: Equations",
                                link: "https://phet.colorado.edu/sims/html/vector-addition-equations/latest/vector-addition-equations_all.html",
                                description:
                                    "Napredna verzija vektorskog zbrajanja uz jednadžbe i matematički prikaz.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Računanje i funkcionalna analiza",
                        games: [
                            {
                                name: "Derivacija i integracija - Identify the derivative game",
                                link: "https://www.geogebra.org/m/eg5u3nef",
                                description:
                                    "Interaktivna igra prepoznavanja derivacija funkcija i njihovih grafova.",
                            },
                            {
                                name: "The big derivative puzzle",
                                link: "https://english.mathe-online.at/tests/diff1/ablerkennen.html",
                                description:
                                    "Igra za testiranje znanja o derivacijama raznih funkcija.",
                            },
                            {
                                name: "Integralni računi - The Integral Game",
                                link: "https://www.geogebra.org/m/vr9hdfnt",
                                description:
                                    "Zadaci za određene i neodređene integrale, interaktivno rješavanje.",
                            },
                            {
                                name: "Indefinite Integral Overview - Quiz & Worksheet",
                                link: "https://study.com/academy/practice/quiz-worksheet-indefinite-integrals.html",
                                description:
                                    "Kviz i radni list za vježbanje neodređenih integrala i pravila integriranja.",
                            },
                        ],
                    },
                    {
                        name: "Matematička logika",
                        games: [
                            {
                                name: "Logičke operacije - Logic: Conjunction and Disjunction",
                                link: "https://quizizz.com/admin/quiz/5e95cdfe8e1323001f1316aa/logic-conjunction-and-disjunction",
                                description:
                                    "Edukativna igra o logičkim veznicima (konjunkcija i disjunkcija).",
                            },
                            {
                                name: "Matrice - Math Matrix tank game",
                                link: "https://www.mathnook.com/math/math-matrix.html",
                                description:
                                    "Igra koja koristi matrične operacije (zbrajanje, množenje) u kontekstu ‘borbe tenkova’.",
                            },
                            {
                                name: "Matrix Multiplication",
                                link: "https://www.tinytap.com/activities/glvb/play/matrix-multiplication",
                                description:
                                    "Interaktivna igra za učenje i vježbanje množenja matrica kroz jednostavne zadatke.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Informatika",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Osnovni pojmovi informatike",
                        games: [
                            {
                                name: "Osnovne komponente računala - Parts of a Computer Match Game",
                                link: "https://wordwall.net/resource/10827661/computing/parts-of-a-computer",
                                description:
                                    "Povezivanje slika računalnih komponenti (CPU, monitor, tipkovnica) s nazivima.",
                            },
                            {
                                name: "Computer Puzzle Game",
                                link: "https://planeta42.com/it/computerpuzzle/",
                                description:
                                    "Slagalica za sastavljanje računala i razumijevanje funkcija pojedinih dijelova.",
                            },
                            {
                                name: "Osnovni operativni sustavi - You’re the OS",
                                link: "https://plbrault.itch.io/youre-the-os",
                                description:
                                    "Igra gdje preuzimate ulogu OS-a i upravljate memorijom, procesima i resursima.",
                            },
                        ],
                    },
                    {
                        name: "Računalne mreže i internet",
                        games: [
                            {
                                name: "Internet Simulator",
                                link: "https://studio.code.org/s/netsim",
                                description:
                                    "Simulator koji vizualizira kako podaci putuju mrežom i osnovne internet protokole.",
                            },
                            {
                                name: "Internet i sigurnost na internetu - Interland",
                                link: "https://beinternetawesome.withgoogle.com/hr_hr/interland",
                                description:
                                    "Igra za djecu o sigurnosti na internetu, prepoznavanju lažnih informacija i zaštiti privatnosti.",
                            },
                            {
                                name: "Space Shelter",
                                link: "https://spaceshelter.withgoogle.com/",
                                description:
                                    "Avanturistička igra o sigurnosti na internetu, zaštiti osobnih podataka u ‘svemirskom’ scenariju.",
                            },
                            {
                                name: "Osnovni protokoli internetskih mreža - Internet Protocols Match Up",
                                link: "https://wordwall.net/resource/141330/computing/internet-protocols",
                                description:
                                    "Igra za povezivanje protokola (TCP/IP, HTTP, DNS) s njihovim funkcijama.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Uvod u programiranje",
                        games: [
                            {
                                name: "Scratch",
                                link: "https://scratch.mit.edu/projects/editor/?tutorial=getStarted",
                                description:
                                    "Vizualni jezik programiranja za interaktivne priče, igre i animacije.",
                            },
                            {
                                name: "Code Combat",
                                link: "https://codecombat.com/",
                                description:
                                    "Edukativna igra koja koristi Python/JavaScript za rješavanje izazova kodiranjem.",
                            },
                        ],
                    },
                    {
                        name: "Računalni sustavi",
                        games: [
                            {
                                name: "Arhitektura računala - PC Building simulator",
                                link: "https://store.epicgames.com/en-US/p/pc-building-simulator-2--demo",
                                description:
                                    "Simulacija izgradnje vlastitog računala (odabir i ugradnja komponenti).",
                            },
                            {
                                name: "Osnovna logika (logička vrata, binarni brojevi) - Digital Logic Sim",
                                link: "https://sebastian.itch.io/digital-logic-sim",
                                description:
                                    "Istraživanje digitalne logike (AND, OR, NOT) i sastavljanje logičkih sklopova.",
                            },
                            {
                                name: "The Boolean Game",
                                link: "https://boolean.method.ac/",
                                description:
                                    "Edukativna igra za učenje boolean logike i osnovnih logičkih operacija.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Razvijanje i optimiziranje programa",
                        games: [
                            {
                                name: "Rad s bazama podataka (SQL) - SQL Muerder Mystery",
                                link: "https://mystery.knightlab.com/",
                                description:
                                    "Rješavanje misterija ubojstva pisanjem SQL upita, zabavan način učenja rada s bazama.",
                            },
                            {
                                name: "Lost at SQL",
                                link: "https://lost-at-sql.therobinlord.com/",
                                description:
                                    "Igra u kojoj ste ‘izgubljeni’ u bazi i trebate SQL vještine za pretraživanje i upravljanje podacima.",
                            },
                            {
                                name: "Testiranje, debugiranje i optimizacija koda - Debugger Puzzle",
                                link: "https://www.tynker.com/hour-of-code/debugger",
                                description:
                                    "Edukativna zagonetka za učenje pronalaska bugova i optimiziranja koda.",
                            },
                        ],
                    },
                    {
                        name: "Računalna grafika i multimedija",
                        games: [
                            {
                                name: "Tinkercad",
                                link: "https://www.tinkercad.com/",
                                description:
                                    "Intuitivna platforma za 3D modeliranje i dizajn, idealna za početnike.",
                            },
                            {
                                name: "Audacity",
                                link: "https://www.audacityteam.org/",
                                description:
                                    "Besplatni alat za uređivanje zvuka. Iako nije igra, omogućuje interaktivno učenje obrade zvuka.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Napredne tehnike programiranja",
                        games: [
                            {
                                name: "OOP (objektno-orijentirano programiranje) - Learn OOP",
                                link: "https://jakubjahic.itch.io/learn-object-oriented-programming",
                                description:
                                    "Interaktivna igra koja pokriva principe OOP-a: klase, objekti, nasljeđivanje, enkapsulacija.",
                            },
                            {
                                name: "Rad s naprednijim bazama - SQL PD",
                                link: "https://sqlpd.com/",
                                description:
                                    "Platforma s izazovima za složenije SQL upite i optimizaciju baza podataka.",
                            },
                            {
                                name: "Razvoj web aplikacija (HTML, CSS, JS) - Flexbox Adventure",
                                link: "https://codingfantasy.com/games/flexboxadventure/play",
                                description:
                                    "Igra za učenje CSS Flexbox-a, rješavanjem layout zadataka u obliku avanture.",
                            },
                            {
                                name: "Codex",
                                link: "https://www.codedex.io/",
                                description:
                                    "Kombinira igru i edukaciju za HTML, CSS i JavaScript, stvarajući interaktivne web stranice.",
                            },
                            {
                                name: "CSS Battle",
                                link: "https://cssbattle.dev/",
                                description:
                                    "Natjecateljska igra kod koje morate replicirati izgled samo s CSS-om, optimizirajući kod.",
                            },
                        ],
                    },
                    {
                        name: "Sigurnost računala i internetska sigurnost",
                        games: [
                            {
                                name: "Zaštita osobnih podataka - Datak",
                                link: "https://www.gamesforchange.org/games/datak-a-serious-game-about-personal-data/",
                                description:
                                    "Igra o zaštiti osobnih podataka i sigurnosti na internetu, upravljanje virtualnim likom i donošenje sigurnosnih odluka.",
                            },
                            {
                                name: "Ransom Attack",
                                link: "https://www.educationarcade.co.nz/ransom-attack",
                                description:
                                    "Simulacija obrane od ransomware napada i razumijevanje strategija kibernetičke sigurnosti.",
                            },
                            {
                                name: "Bruteforce",
                                link: "https://www.educationarcade.co.nz/bruteforce",
                                description:
                                    "Igra za razumijevanje brute force napada i važnosti snažnih zaporki te enkripcije.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Engleski",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Teme",
                        games: [
                            {
                                name: "Osobni identitet i svakodnevni život - Daily Routine",
                                link: "https://www.gamestolearnenglish.com/daily-routines/",
                                description:
                                    "Istraživanje vokabulara vezanog uz svakodnevne aktivnosti i rutine.",
                            },
                            {
                                name: "Škola i obrazovanje - School Subjects ESL Vocabulary Game",
                                link: "https://www.eslgamesplus.com/school-vocabulary-game-practice-school-supplies-subjects-school-tools-and-actions/",
                                description:
                                    "Utrka automobila za učenje naziva školskih predmeta, alata i aktivnosti.",
                            },
                            {
                                name: "Slobodno vrijeme i interesi",
                                link: "https://test-english.com/vocabulary/a2/hobbies-and-free-time-a2-english-vocabulary/",
                                description:
                                    "Hobbies and free time activities – Učenje vokabulara hobija i aktivnosti u slobodno vrijeme.",
                            },
                            {
                                name: "Obitelj i prijatelji - Who anagram",
                                link: "https://wordwall.net/resource/6707026/english/who",
                                description:
                                    "Zabavna igra slaganja anagrama za pojmove vezane uz obitelj i prijatelje.",
                            },
                        ],
                    },
                    {
                        name: "Gramatika",
                        games: [
                            {
                                name: "Prezent (Simple i Continuous) - Present perfect: simple or continuous?",
                                link: "https://wordwall.net/resource/66978041/present-perfect-simple-or-continuous",
                                description:
                                    "Vježbanje razlike između present perfect simple i continuous oblika.",
                            },
                            {
                                name: "Osnovni prošli oblici (Past Simple, Past Continuous)",
                                link: "https://wordwall.net/resource/66080506/esl/past-simple-past-continuous",
                                description:
                                    "Popunjavanje rečenica ispravnim prošlim glagolskim oblicima.",
                            },
                            {
                                name: "Buduće vrijeme (will, going to) - Monkey Iscle Future Tenses",
                                link: "https://www.eslgamesplus.com/future-tenses-english-quiz-game-will-going-to/",
                                description:
                                    "Kviz za razlikovanje i pravilnu upotrebu ‘will’ i ‘going to’.",
                            },
                            {
                                name: "Osnovni modalni glagoli (can, must, should) - Modal Verbs Quiz",
                                link: "https://wordwall.net/resource/29450652/modal-verbs-may-can-could-have-to-should-must",
                                description:
                                    "Biranje pravilnih modalnih glagola u različitim kontekstima.",
                            },
                            {
                                name: "Red riječi u rečenici, pitanje i negacija - Sentence Bubbles",
                                link: "https://www.gamestolearnenglish.com/bubbles-english/",
                                description:
                                    "Slaganje rečenica iz izmiješanih riječi, vježbanje pravilnog reda riječi.",
                            },
                            {
                                name: "Word order in questions Unjumble",
                                link: "https://wordwall.net/resource/17605340/word-order-in-questions",
                                description:
                                    "Razmještanje riječi u ispravan red za formiranje pitanja.",
                            },
                            {
                                name: "Negative Sentences Exercise",
                                link: "https://www.englisch-hilfen.de/en/exercises/word_order/sentences15.htm",
                                description:
                                    "Pretvaranje zadanih rečenica u negativne oblike (vježba).",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Teme",
                        games: [
                            {
                                name: "Putovanja i turizam",
                                link: "https://wordwall.net/resource/8763855/transport-and-travelling/fill-in-the-gaps-with-missing-words",
                                description:
                                    "Travel Fill in the Words – Ispunjavanje praznina s pojmovima o putovanju i prijevozu.",
                            },
                            {
                                name: "Zdravlje i način života - Health Vocabulary Games",
                                link: "https://www.mes-games.com/health.php",
                                description:
                                    "Interaktivne igre o zdravlju i zdravim navikama kroz zadatke vokabulara.",
                            },
                            {
                                name: "Mediji i tehnologija - Technology Memory",
                                link: "https://wordwall.net/resource/28639746/english/technology",
                                description:
                                    "Igra memorije za povezivanje pojmova i slika o modernoj tehnologiji.",
                            },
                            {
                                name: "Priroda i okoliš - Nature Vocabulary Games",
                                link: "https://www.mes-games.com/nature1.php",
                                description:
                                    "Igre vokabulara koje se fokusiraju na floru, faunu i okoliš.",
                            },
                            {
                                name: "Društvene mreže i komunikacija - Social Media Wordsearch",
                                link: "https://wordwall.net/resource/28579277/social-media",
                                description:
                                    "Klasična igra traženja riječi s pojmovima o društvenim mrežama.",
                            },
                        ],
                    },
                    {
                        name: "Gramatika",
                        games: [
                            {
                                name: "Present Perfect (Simple i Continuous) - Present Perfect Monkey Game",
                                link: "https://www.eslgamesplus.com/have-ever-present-perfect-moonshot/",
                                description:
                                    "Igra s majmunima za uvježbavanje present perfect oblika kroz pitanja i odgovore.",
                            },
                            {
                                name: "Past Perfect - Bamboozle",
                                link: "https://www.baamboozle.com/game/221985",
                                description:
                                    "Zabavna igra s pitanjima i odgovorima vezanim uz past perfect.",
                            },
                            {
                                name: "Kondicionali (Zero, First, Second) - Conditional Sentences",
                                link: "https://www.gamestolearnenglish.com/conditional-sentences/",
                                description:
                                    "Interaktivna igra za uvježbavanje različitih tipova kondicionala.",
                            },
                            {
                                name: "Pasiv (osnovni oblici) - Sentence Complete Passive",
                                link: "https://wordwall.net/resource/54865074/english/passive",
                                description:
                                    "Popunjavanje praznina pasivnim oblicima u rečenicama.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Teme",
                        games: [
                            {
                                name: "Kultura i umjetnost - Artistic Categories Game",
                                link: "https://www.englishclub.com/esl-games/vocabulary/cloze-arts-7.php",
                                description:
                                    "Istraživanje vokabulara vezanog uz različite umjetničke kategorije i izraze.",
                            },
                            {
                                name: "Globalni izazovi - Global Issues Wordsearch",
                                link: "https://wordwall.net/resource/14379649/global-issues",
                                description:
                                    "Traženje ključnih pojmova vezanih uz globalne probleme poput siromaštva i klimatskih promjena.",
                            },
                            {
                                name: "Budućnost rada i obrazovanja - Jobs Vocabulary Spelling Game",
                                link: "https://www.eslgamesplus.com/learn-to-spell-vocabulary-related-to-jobs-doctor-dentist-chef-esl-spelling-activity-online/",
                                description:
                                    "Spelling igra s riječima o profesijama, radnim mjestima i obrazovanju.",
                            },
                            {
                                name: "Znanstvena dostignuća - Science and Technology Vocabulary Games",
                                link: "https://www.englishclub.com/esl-games/vocabulary/cloze-science.php",
                                description:
                                    "Proširivanje vokabulara o znanstvenim pojmovima i modernim tehnološkim dostignućima.",
                            },
                        ],
                    },
                    {
                        name: "Gramatika",
                        games: [
                            {
                                name: "Kondicionali (Third i mješoviti) - Third Conditional Gameshow Quiz",
                                link: "https://wordwall.net/resource/68269541/third-conditional",
                                description:
                                    "Kviz u obliku TV emisije za uvježbavanje trećeg kondicionala.",
                            },
                            {
                                name: "Mixed Conditionals Quiz",
                                link: "https://wordwall.net/resource/67420485/fce-mixed-conditionals",
                                description:
                                    "Vježba za miješane kondicionale ovisno o situacijama i rečenicama.",
                            },
                            {
                                name: "Napredni pasiv - Passive Voice: Play or Pass Game",
                                link: "https://ihteachenglish.com/resource/passive-voice-play-or-pass-game",
                                description:
                                    "Odabir točnih aktivnih ili pasivnih rečenica i primjena pasiva u kontekstu.",
                            },
                            {
                                name: "Gerund i infinitiv - Gerund or Infinitive? Group Sort",
                                link: "https://wordwall.net/resource/26867610/gerund-or-infinitive",
                                description:
                                    "Sortiranje izraza na one koji zahtijevaju gerund i one koji zahtijevaju infinitiv.",
                            },
                            {
                                name: "Reported speech - Reported speech game",
                                link: "https://www.teach-this.com/images/resources/telephone-messages.pdf",
                                description:
                                    "Igra ‘Telephone Messages’ za uvježbavanje prenesenog govora u engleskom jeziku.",
                            },
                            {
                                name: "Složenije rečenične strukture (relativne rečenice, inversion)",
                                link: "https://wordwall.net/resource/34039896/simple-sentences-compound-sentences",
                                description:
                                    "Simple vs Compound Sort – Sortiranje rečenica prema složenosti i korištenje veznika.",
                            },
                            {
                                name: "Relative Clauses Quiz",
                                link: "https://wordwall.net/resource/30473325/english/relative-clauses",
                                description:
                                    "Provjera znanja i pravilne primjene relativnih rečenica.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Teme",
                        games: [
                            {
                                name: "Etika i tehnologija - Moral Dilemmas Discussion Duel",
                                link: "https://www.baamboozle.com/game/679879",
                                description:
                                    "Interaktivne moralne dileme i donošenje etičkih odluka vezanih uz tehnologiju.",
                            },
                            {
                                name: "Globalizacija i multikulturalizam",
                                link: "https://en.islcollective.com/english-esl-worksheets/reading-comprehension/reading-for-detail-deep-reading/human-rights-and-discrimination/multiculturalism-and-globalisation/84156",
                                description:
                                    "Aktivnosti istraživanja globalizacije, ljudskih prava i diskriminacije.",
                            },
                            {
                                name: "Politika, ekonomija i pravo - Politics Vocabulary Game",
                                link: "https://exhibitaenglish.com/politics-vocabulary-games/",
                                description:
                                    "Interaktivna igra koja pokriva politički i ekonomski vokabular te zakonodavni proces.",
                            },
                            {
                                name: "Priprema za daljnje obrazovanje i radno mjesto - Likes and Dislikes at Work",
                                link: "https://www.teach-this.com/images/resources/likes-and-dislikes-at-work.pdf",
                                description:
                                    "Rasprava o preferencijama i nevoljenim aspektima radnog okruženja, učenje ključnih fraza.",
                            },
                        ],
                    },
                    {
                        name: "Gramatika",
                        games: [
                            {
                                name: "Frazeološki glagoli - Phrasal verbs Match Up",
                                link: "https://wordwall.net/resource/5994601/phrasal-verbs",
                                description:
                                    "Spajanje frazalnih glagola s njihovim značenjem i kontekstom.",
                            },
                            {
                                name: "Idiomi - Idiom match up!",
                                link: "https://wordwall.net/resource/10326270/idiom-match-up",
                                description:
                                    "Upoznavanje s uobičajenim engleskim idiomima i njihovo pravilno korištenje.",
                            },
                            {
                                name: "Kompleksne rečenice i napredni vokabular - Complex Sentences Board Game",
                                link: "https://www.twinkl.hr/resource/t-l-957-complex-sentences-challenge-game",
                                description:
                                    "Igra na ploči za vježbanje korištenja veznika i složenih rečenica.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

// ------------------ COMPONENTS ------------------

/** LEVEL 3: GAMES for a given Gradivo */
const GradivoPanel: React.FC<TGradivo> = ({name, games, isSearchMode}) => {
    const [open, setOpen] = useState(false);

    return (
        <Card variant="outlined" sx={{mb: 2}}>
            <CardHeader
                title={
                    <Typography
                        variant="h6"
                        sx={{cursor: "pointer"}}
                        onClick={() => setOpen(!open)}
                    >
                        {name}
                    </Typography>
                }
                action={
                    <IconButton onClick={() => setOpen(!open)}>
                        {open || isSearchMode? <KeyboardArrowUpIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                }
            />
            <Collapse in={open || isSearchMode}>
                <CardContent>
                    {games.map((game, idx) => (
                        <Box key={idx} sx={{mb: 3}}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {game.name}
                            </Typography>
                            <Typography variant="body2" sx={{whiteSpace: "pre-line"}}>
                                {game.description}
                            </Typography>
                            {game.link && (
                                <Box mt={1}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => window.open(game.link, "_blank")}
                                    >
                                        Otvori igru
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
};

/** LEVEL 2: GRADIVO for a given Razred */
const RazredPanel: React.FC<TRazred> = ({name, gradivo, isSearchMode}) => {
    const [open, setOpen] = useState(false);

    return (
        <Card variant="outlined" sx={{mb: 3}}>
            <CardHeader
                title={
                    <Typography
                        variant="h5"
                        sx={{cursor: "pointer"}}
                        onClick={() => setOpen(!open)}
                    >
                        {name}
                    </Typography>
                }
                action={
                    <IconButton onClick={() => setOpen(!open)}>
                        {open || isSearchMode ? <KeyboardArrowUpIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                }
            />
            <Collapse in={open || isSearchMode}>
                <CardContent>
                    {gradivo.map((g, idx) => (
                        <GradivoPanel key={idx} name={g.name} games={g.games} isSearchMode={isSearchMode}/>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
};

/** LEVEL 1: RAZREDI for a given Subject */
const SubjectPanel: React.FC<TSubject> = ({name, razredi, isSearchMode}) => {
    const [open, setOpen] = useState(false);

    return (
        <Card variant="outlined" sx={{mb: 3}}>
            <CardHeader
                title={
                    <Typography
                        variant="h4"
                        sx={{cursor: "pointer"}}
                        onClick={() => setOpen(!open)}
                    >
                        {name}
                    </Typography>
                }
                action={
                    <IconButton onClick={() => setOpen(!open)}>
                        {open || isSearchMode ? <KeyboardArrowUpIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                }
            />
            <Collapse in={open || isSearchMode}>
                <CardContent>
                    {razredi.map((razred, idx) => (
                        <RazredPanel key={idx} name={razred.name} gradivo={razred.gradivo} isSearchMode={isSearchMode}/>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
};

// ------------------ MAIN APP ------------------

const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
    },
});

const useDebounce = <T,>(initialState: T, timout = 300): [T, (t: T) => void, T] => {
    const [instantState, setInstantState] = useState<T>(initialState);
    const [debouncedState, setDebouncedState] = useState<T>(initialState);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedState(instantState);
        }, timout);

        return () => {
            clearTimeout(handler);
        };
    }, [instantState, timout]);

    return [debouncedState, setInstantState, instantState];
}

const Search = ({onChange}: {onChange : (search: string) => void}) => {
    const [debouncedSearch, setSearch, search] = useDebounce("");

    useEffect(() => {
        onChange(debouncedSearch);
    }, [debouncedSearch, onChange]);

    return (
        <TextField
                    label={"Pretraži igre"}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
                            endAdornment: search.length > 0 && (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setSearch("")}>
                                        <CloseIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
    );
}

const App: React.FC = () => {
    const [search, setSearch] = useState("");

    const isSearchMode = search.length > 0;

    const toShow = useMemo(() => {
        const ret = [];

        for (const subject of SUBJECTS) {
            const razredi = [];

            for (const razred of subject.razredi) {
                const gradivo = [];

                for (const g of razred.gradivo) {
                    const games = g.games.filter((game) => {
                        return (game.name.toLowerCase()+game.description.toLowerCase()).includes(search.toLowerCase());
                    });

                    if (games.length > 0) {
                        gradivo.push({name: g.name, games});
                    }
                }

                if (gradivo.length > 0) {
                    razredi.push({name: razred.name, gradivo});
                }
            }

            if (razredi.length > 0) {
                ret.push({name: subject.name, razredi});
            }
        }

        return ret;
    }, [search]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container maxWidth="lg" sx={{py: 4}}>
                <Typography variant="h3" align="center" gutterBottom>
                    Edukacijske Igre po Razredima i Gradivu
                </Typography>
                <Typography variant="subtitle1" align="center" paragraph>
                    Kliknite na predmet, zatim odaberite razred i gradivo kako biste pronašli
                    pripadajuće igre, simulacije i kvizove.
                </Typography>

                <Search onChange={setSearch}/>

                {toShow.map((subject) => (
                    <SubjectPanel key={subject.name} name={subject.name} razredi={subject.razredi} isSearchMode={isSearchMode}/>
                ))}
            </Container>
        </ThemeProvider>
    );
};

export default App;
