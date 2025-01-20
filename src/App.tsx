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
    Button, TextField, InputAdornment, Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

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
        name: "Korisne informacije",
        razredi: [
            {
                name: "Svojstva i metode korištenja u nastavi",
                gradivo: [
                    {
                        name: "Svojstva serious gamesa",
                        games: [
                            {
                                name: "Interaktivnost",
                                description: "Serious games omogućuju visok stupanj interaktivnosti, što znači da učenici aktivno sudjeluju u procesu učenja. Umjesto pasivnog primanja informacija, igrači preuzimaju kontrolu i donose odluke koje utječu na ishod igre, čime se povećava angažman i motivacija."
                            },
                            {
                                name: "Poticaj za učenje",
                                description: "Serious games često koriste izazove i nagrade za motivaciju učenika, čineći proces učenja zabavnim i motivirajućim. Bodovi, medalje i napredak u igri mogu učiniti učenicima stvarima jasnije, kao i naglasiti važnost određenih koncepata."
                            },
                            {
                                name: "Realizam",
                                description: "Serious games često uključuju simulacije stvarnih situacija, poput upravljanja firmom, istraživanja ekoloških problema ili vođenja društvenih politika. Ove igre omogućuju učenicima da razumiju složene sustave i situacije kroz praktično iskustvo, čime se povezuje teorija s realnim svijetom."
                            },
                            {
                                name: "Prilagodljivost",
                                description: "Većina serious gamesa omogućuje prilagodbu različitim potrebama učenika. Igre mogu biti postavljene na različite razine težine, pružajući odgovarajući izazov svim učenicima bez obzira na njihov početni nivo. Također, igre mogu biti dizajnirane tako da podržavaju različite stilove učenja."
                            },
                        ],
                    },
                    {
                        name: "Korištenje serious gamesa u nastavi",
                        games: [
                            {
                                name: "Učenje kroz igru",
                                description: "Korištenje igara u nastavi omogućuje učenicima da uče kroz igru, što povećava njihovu angažiranost i učinak. Igra omogućuje učenicima da primijene svoje znanje u realnim scenarijima, čime se produbljuje razumijevanje predmeta i razvija kritičko razmišljanje."
                            },
                            {
                                name: "Simulacije i eksperimenti",
                                description: "Simulacije unutar igara pružaju studentima priliku za testiranje teorija i eksperimentiranje u sigurnom okruženju. Na primjer, igra koja simulira upravljanje ekonomijom omogućuje učenicima da testiraju različite strategije i vide njihove posljedice bez stvarnog rizika."
                            },
                            {
                                name: "Razvijanje timskih vještina",
                                description: "Neke igre, posebno one koje uključuju timski rad, mogu pomoći učenicima u razvijanju vještina suradnje, komunikacije i zajedničkog donošenja odluka. Igre koje zahtijevaju međusobnu suradnju mogu poboljšati socijalne vještine i izgraditi zajedništvo među učenicima."
                            },
                            {
                                name: "Poticanje samostalnog učenja",
                                description: "Serious games također potiču učenike da preuzmu odgovornost za vlastito učenje. Kroz povratne informacije i napredak u igri, učenici mogu samostalno pratiti svoj napredak i donositi odluke o tome kako će nastaviti učiti i rješavati zadatke."
                            },
                            {
                                name: "Fleksibilnost u nastavi",
                                description: "Serious games mogu se lako integrirati u nastavu na različite načine. Mogu se koristiti za obogaćivanje redovnih lekcija, kao i za dodatne aktivnosti ili izazove, što učiteljima omogućuje da kreativno pristupe podučavanju i prilagode igru specifičnim potrebama učeničke skupine."
                            },
                            {
                                name: "Evaluacija i povratne informacije",
                                description: "Serious games također omogućuju učiteljima da prate napredak učenika kroz evaluaciju unutar igre. Mnoge igre sadrže analitičke alate koji prate učinak učenika, što omogućava učiteljima da prepoznaju snage i slabosti učenika te prilagode nastavu."
                            },
                        ]
                    }
                ],
            },
            {
                name: "Sve je lakše s drugima, uključite se u zajednice praktičara",
                gradivo: [
                    {
                        name: "Zajednice praktičara",
                        games: [
                            {
                                name: "Games for Change",
                                description:
                                    'Globalna zajednica fokusirana na razvoj i upotrebu igara za edukaciju, društveni utjecaj i svjesnost o važnim temama.',
                                link: "https://www.gamesforchange.org/",
                            },
                            {
                                name: "Serious Games Society (SGS)",
                                link: "https://seriousgamessociety.org/",
                                description: "Organizacija koja okuplja istraživače i edukatore za promicanje razvoja i istraživanja ozbiljnih igara."
                            },
                            {
                                name: "Educational Games Research Group (EGRG)",
                                link: "http://www.educationalgamesresearch.com/",
                                description: "Webinari, materijali za nastavnike i članci o metodama učenja uz igre."
                            },

                        ],
                    },
                    {
                        name: "Online grupe i forumi",
                        games: [
                            {
                                name: "Reddit: Serious Gamessdf",
                                link: "https://www.reddit.com/r/SeriousGames/",
                                description: "Forum na Redditu posvećen ozbiljnim igrama i njihovoj primjeni u obrazovanju."
                            },
                            {
                                name: "LinkedIn Group: All about Digital Learning: Serious Games, 3D Simulations",
                                description: "Profesori i stručnjaci iz obrazovanja dijele svoja iskustva u korištenju serious games.",
                                link: "https://www.linkedin.com/groups/5165604/"
                            },
                        ],
                    },
                    {
                        name: "Kako pridonijeti zajednicama?",
                        games: [
                            {
                                name: "Sudjelujte na konferencijama:",
                                description: "Primjerice, Games for Change Festival ili Serious Play Conference pružaju priliku za razmjenu ideja i učenje od stručnjaka."
                            },
                            {
                                name: "Podijelite vlastite projekte: ",
                                description: "Prezentirajte iskustva s primjenom ozbiljnih igara ili razvijenih rješenja na platformama kao što su LinkedIn ili Games for Change."
                            },
                            {
                                name: "Pridružite se online webinarima i radionicama: ",
                                description: "Većina gore navedenih zajednica organizira online događaje o razvoju i upotrebi ozbiljnih igara."
                            },
                            {
                                name: "Razvijajte vlastite igre i testirajte ih:",
                                description: "Zajednice često traže sudionike za testiranje igara te pružaju povratne informacije i savjete."
                            }
                        ],
                    }
                ],
            },
            {
                "name": "Želite napraviti vlastiti Serious Game?",
                "gradivo": [
                    {
                        "name": "Planiranje igre",
                        "games": [
                            {
                                "name": "Definiranje ciljeva",
                                "description": "Prvi korak u izradi serious game je jasno definiranje cilja. Ciljevi mogu uključivati obrazovne ciljeve (npr. učenje povijesti ili jezika), razvoj specifičnih vještina (npr. kritičko mišljenje ili kreativnost) ili simulaciju stvarnih situacija (npr. klimatske promjene ili upravljanje resursima)."
                            },
                            {
                                "name": "Odabir ciljne publike",
                                "description": "Razvoj uspješne serious game započinje razumijevanjem ciljne publike. Ključno je definirati tko će igrati igru, kako bi sadržaj bio prilagođen njihovim potrebama i interesima. Dobna skupina igrača, njihova razina znanja i osobni interesi igraju značajnu ulogu u oblikovanju igre. Na primjer, igre za djecu trebaju sadržavati jednostavna pravila i vizualno privlačne elemente, dok su igre za odrasle složenije i tematski dublje. Ako izrađujete igru za ljubitelje povijesti, možete osmisliti scenarije koji rekonstruiraju povijesne događaje ili omogućuju simulaciju poznatih bitaka, čime se dodatno angažira ciljana publika."
                            },
                            {
                                "name": "Postavljanje mjerljivih ciljeva",
                                "description": "Kako biste osigurali učinkovitost igre, važno je definirati jasne i mjerljive ciljeve. Ciljevi trebaju biti specifični i povezani s ishodima učenja ili vještinama koje igrači trebaju razviti tijekom igranja. Primjerice, obrazovni cilj može biti da igrači uspješno identificiraju ključne uzroke industrijske revolucije nakon završetka igre. Osim toga, ciljevi poput postotka uspješno riješenih zagonetki unutar određenog vremena omogućuju praćenje napretka i prilagodbu igre prema potrebama igrača."
                            },
                            {
                                "name": "Resursi i ograničenja",
                                "description": "Svaki razvojni proces mora uzeti u obzir dostupne resurse i ograničenja. Prilikom planiranja, razmotrite vrijeme koje imate na raspolaganju, dostupne alate i tehnologiju, kao i budžet za projekt. Ako imate ograničene resurse, alati poput Scratcha ili Construct 3 mogu biti idealni jer omogućuju jednostavno kreiranje interaktivnih igara bez potrebe za naprednim programiranjem. Uz dobro planiranje resursa, čak i manji timovi mogu ostvariti visoku razinu kvalitete."
                            },
                            {
                                "name": "Resursi i ograničenja",
                                "description": "Svaki razvojni proces mora uzeti u obzir dostupne resurse i ograničenja. Prilikom planiranja, razmotrite vrijeme koje imate na raspolaganju, dostupne alate i tehnologiju, kao i budžet za projekt. Ako imate ograničene resurse, alati poput Scratcha ili Construct 3 mogu biti idealni jer omogućuju jednostavno kreiranje interaktivnih igara bez potrebe za naprednim programiranjem. Uz dobro planiranje resursa, čak i manji timovi mogu ostvariti visoku razinu kvalitete."
                            }
                        ]
                    },
                    {
                        "name": "Odabir vrste igre",
                        "games": [
                            {
                                "name": "Kviz igre",
                                "description": "Kviz igre su idealne za testiranje znanja i pomažu u učenju činjenica kroz brzo ponavljanje. Primjeri alata za izradu kvizova uključuju Kahoot! i Quizizz."
                            },
                            {
                                "name": "Simulacije",
                                "description": "Simulacije omogućuju učenicima istraživanje stvarnih situacija poput znanstvenih eksperimenata ili ekonomskih modela. PhET Interactive Simulations i SimCity su popularni primjeri."
                            },
                            {
                                "name": "Role-playing igre (RPG)",
                                "description": "RPG igre potiču učenike da preuzmu različite uloge i donose odluke u simuliranim situacijama. Primjeri uključuju Classcraft ili Minecraft Education Edition."
                            },
                            {
                                "name": "Puzzles i slagalice",
                                "description": "Slagalice i puzzles igre pomažu u razvoju logičkog razmišljanja i rješavanja problema. Primjeri uključuju portal igre i Monument Valley."
                            }
                        ]
                    },
                    {
                        "name": "Razvoj sadržaja i pravila igre",
                        "games": [
                            {
                                "name": "Kreiranje narativa",
                                "description": "Ako vaša igra ima priču (npr. RPG), osmislite osnovnu radnju i likove. Primjerice, ako je igra temeljena na povijesti, možete stvoriti likove koji će putovati kroz povijesna razdoblja."
                            },
                            {
                                "name": "Postavljanje pravila",
                                "description": "Pravila definiraju kako igra funkcionira i kako igrači napreduju. Važno je osigurati balans između izazova i intuitivnosti. Pravila mogu uključivati zadatke koje igrači trebaju ispuniti, uvjete za prelazak na sljedeću razinu ili način osvajanja bodova. Fleksibilnost je ključna – omogućite opcije za početnike i napredne igrače."
                            },
                            {
                                "name": "Povratne informacije i nagrade",
                                "description": "Povratne informacije igračima pokazuju njihove uspjehe i pogreške te ih usmjeravaju prema ciljevima. One mogu biti trenutačne, poput savjeta ili rezultata, dok nagrade – bodovi, otključavanje novih razina ili priče – motiviraju nastavak igranja. Dobar sustav nagrađivanja potiče igrače na učenje i eksperimentiranje."
                            }
                        ]
                    },
                    {
                        "name": "Alati za izradu igara",
                        "games": [
                            {
                                "name": "Scratch",
                                "description": "Scratch je jednostavan alat za izradu interaktivnih priča, igara i animacija. Idealan za početnike.",
                                "link": "https://scratch.mit.edu/"
                            },
                            {
                                "name": "GameSalad",
                                "description": "Vizualni alat za stvaranje jednostavnih igara bez kodiranja. Pogodan za edukacijske projekte.",
                                "link": "https://gamesalad.com/"
                            },
                            {
                                "name": "Construct 3",
                                "description": "Alat za izradu 2D igara bez programiranja, s naglaskom na brzinu implementacije u obrazovni kontekst.",
                                "link": "https://construct.net/"
                            },
                            {
                                "name": "Unity",
                                "description": "Platforma za razvoj složenijih igara uz osnovno znanje programiranja (C#).",
                                "link": "https://unity.com/"
                            },
                            {
                                "name": "Kahoot!",
                                "description": "Jednostavan alat za izradu edukativnih kvizova s mogućnošću igranja u stvarnom vremenu.",
                                "link": "https://kahoot.com/"
                            },
                            {
                                "name": "Quizizz",
                                "description": "Alat za prilagodljive kvizove koji omogućuje praćenje napretka učenika.",
                                "link": "https://quizizz.com/"
                            }
                        ]
                    },
                    {
                        "name": "Testiranje igre",
                        "games": [
                            {
                                "name": "Beta testiranje",
                                "description": "Pozovite kolege, učitelje ili učenike da isprobaju igru. Zabilježite njihove povratne informacije o tehničkim problemima, pravilima i igračkom iskustvu. Ovo je ključna faza za uočavanje nesporazuma i potencijalnih grešaka prije široke distribucije."
                            },
                            {
                                "name": "Ispitivanje izvedbe i tehničkih problema",
                                "description": "Testirajte izvedbu igre na različitim uređajima i provjerite da li se učitava brzo, bez grešaka. Fokusirajte se na tehničke aspekte poput brzine, stabilnosti i kompatibilnosti na mobilnim uređajima i računalima."
                            },
                            {
                                "name": "Analiza korisničkog iskustva",
                                "description": "Pitajte igrače o njihovim dojmovima. Provjerite koliko je igra intuitivna i zabavna, te gdje su naišli na poteškoće. Poboljšajte sučelje i upute kako bi igra bila lakša za korištenje."
                            },
                            {
                                "name": "Iterativno testiranje i unapređenje",
                                "description": "Testiranje treba biti kontinuiran proces. Na temelju povratnih informacija, unesite izmjene i ponovo testirajte. Ovaj ciklus omogućuje stalno poboljšanje igre i prilagodbu potrebama korisnika."
                            },
                        ]
                    },
                    {
                        "name": "Implementacija igre u nastavu",
                        "games": [
                            {
                                "name": "Kao dio lekcija",
                                "description": "Igru možete koristiti kao alat za ponavljanje gradiva ili motivaciju. Na ovaj način igra postaje dinamičan način za osnaživanje teorijskog znanja učenika."
                            },
                            {
                                "name": "Kao timska aktivnost",
                                "description": "Potaknite učenike na suradnju u igri koja zahtijeva zajedničko donošenje odluka i rješavanje zadataka. Timskim igrama možete poboljšati komunikacijske vještine i timski rad."
                            },
                            {
                                "name": "Kao alat za evaluaciju",
                                "description": "Kroz igre možete pratiti napredak učenika i testirati njihove vještine u realnom vremenu. Koristite rezultate igre za evaluaciju razumijevanja gradiva i predložite individualizirane zadatke."
                            },
                            {
                                "name": "Kao motivacija za učenike",
                                "description": "Igra može poslužiti kao snažan motivacijski alat, angažirajući učenike kroz zabavu i izazove. Kroz igre učenici mogu postati više motivirani za sudjelovanje u nastavi i učenju."
                            },
                            {
                                "name": "Kao nagrada za postignuća",
                                "description": "Korištenje igre kao nagrade za uspješne zadatke ili kao završnu aktivnost može pomoći u jačanju pozitivnog ponašanja i učiniti nastavu zanimljivijom."
                            },
                        ]
                    },
                    {
                        "name": "Pratite napredak i prilagodite",
                        "games": [
                            {
                                "name": "Analiza rezultata",
                                "description": "Redovito pratite kako učenici reagiraju na igru i analizirajte njihovu angažiranost. Na temelju njihovih reakcija, identificirajte područja koja trebaju poboljšanje i prilagodite igru kako bi bolje odgovarala njihovim potrebama."
                            },
                            {
                                "name": "Povratne informacije od učenika",
                                "description": "Prikupljajte povratne informacije od učenika o igri, što im se svidjelo, a što ne. Ove informacije su ključne za prilagodbu sadržaja igre i poboljšanje korisničkog iskustva."
                            },
                            {
                                "name": "Praćenje napretka u igri",
                                "description": "Obratite pažnju na učeničke rezultate i napredak u igri. Ako učenici ne napreduju kako se očekivalo, možda ćete morati prilagoditi izazove ili upute za jasnije razumijevanje ciljeva igre."
                            },
                            {
                                "name": "Uključivanje novih elemenata",
                                "description": "Na temelju povratnih informacija i analize, u igru možete dodavati nove elemente, kao što su dodatni zadaci ili nove razine težine. Ova prilagodba održava igru izazovnom i motivirajućom za učenike."
                            },
                            {
                                "name": "Redovito ažuriranje igre",
                                "description": "Osigurajte da igra bude ažurirana i relevantna s obzirom na napredak u nastavi. Redovitim prilagodbama igre možete zadržati interes učenika i osigurati da ostane u skladu s obrazovnim ciljevima."
                            },
                            {
                                "name": "",
                                "description": ""
                            },
                        ]
                    }
                ]
            }

        ],
    },
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
    {
        name: "Kemija",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Virtualni laboratorij",
                        games: [
                            {
                                name: "ChemCollective Virtual Labs",
                                link: "https://chemcollective.org/vlabs",
                                description: "Virtualni laboratorij koji omogućuje izvođenje raznih kemijskih eksperimenata, uključujući titracije i reakcije.",
                            },
                        ],
                    },
                    {
                        name: "Stanja tvari",
                        games: [
                            {
                                name: "States of Matter Basics (PhET)",
                                link: "https://phet.colorado.edu/sims/html/states-of-matter-basics/latest/states-of-matter-basics_all.html",
                                description: "Simulacija koja prikazuje kako čvrsta, tekuća i plinovita stanja ovise o temperaturi i pritisku.",
                            },
                        ],
                    },
                    {
                        name: "Topljivost",
                        games: [
                            {
                                name: "Solubility - ChemCollective",
                                link: "https://chemcollective.org/solubility",
                                description: "Alati i simulacije za istraživanje topljivosti tvari u vodi i utjecaja faktora poput temperature.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Kiseline i baze",
                        games: [
                            {
                                name: "Acid-Base Chemistry - ChemCollective",
                                link: "https://chemcollective.org/acid-base",
                                description: "Simulacije koje objašnjavaju kiseline, baze i koncept pH vrijednosti.",
                            },
                            {
                                name: "Acid-Base Solutions (PhET)",
                                link: "https://phet.colorado.edu/en/simulation/acid-base-solutions",
                                description: "Simulacija za istraživanje ponašanja kiselina i baza u otopinama.",
                            },
                        ],
                    },
                    {
                        name: "Kemijska ravnoteža",
                        games: [
                            {
                                name: "Equilibrium - ChemCollective",
                                link: "https://chemcollective.org/equilib",
                                description: "Interaktivne aktivnosti za proučavanje kemijske ravnoteže i Le Chatelierova principa.",
                            },
                        ],
                    },
                    {
                        name: "Kemijska kinetika",
                        games: [
                            {
                                name: "Kinetics - ChemCollective",
                                link: "https://chemcollective.org/kinetics",
                                description: "Simulacije za razumijevanje kemijske kinetike, uključujući brzinu reakcija i faktore koji na nju utječu.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Stoehiometrija",
                        games: [
                            {
                                name: "Stoichiometry - ChemCollective",
                                link: "https://chemcollective.org/stoichiometry",
                                description: "Interaktivni alati i zadaci za učenje stoehiometrije. Pomaže učenicima razumjeti odnose među kemijskim reaktantima i proizvodima.",
                            },
                        ],
                    },
                    {
                        name: "Redoks reakcije",
                        games: [
                            {
                                name: "Oxidation-Reduction - ChemCollective",
                                link: "https://chemcollective.org/oxredux",
                                description: "Simulacije za razumijevanje redoks reakcija i njihovih primjena.",
                            },
                        ],
                    },
                    {
                        name: "Plinski zakoni",
                        games: [
                            {
                                name: "Gas Properties (PhET)",
                                link: "https://phet.colorado.edu/en/simulation/gas-properties",
                                description: "Simulacija za proučavanje plinskih zakona i njihovih odnosa (Boyleov, Charlesov zakon).",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Termodinamika",
                        games: [
                            {
                                name: "Thermodynamics - ChemCollective",
                                link: "https://chemcollective.org/thermo",
                                description: "Simulacije i zadaci koji objašnjavaju principe termodinamike, poput entalpije i entropije.",
                            },
                        ],
                    },
                    {
                        name: "Balansiranje jednadžbi",
                        games: [
                            {
                                name: "Balancing Chemical Equations (PhET)",
                                link: "https://phet.colorado.edu/en/simulations/balancing-chemical-equations",
                                description: "Simulacija za vježbanje uravnoteživanja kemijskih jednadžbi.",
                            },
                        ],
                    },
                    {
                        name: "Izotopi i atomska masa",
                        games: [
                            {
                                name: "Isotopes and Atomic Mass (PhET)",
                                link: "https://phet.colorado.edu/en/simulation/isotopes-and-atomic-mass",
                                description: "Simulacija koja objašnjava koncept izotopa i izračunavanje atomske mase.",
                            },
                        ],
                    },
                    {
                        name: "Molekulski polaritet",
                        games: [
                            {
                                name: "Molecule Polarity (PhET)",
                                link: "https://phet.colorado.edu/en/simulations/molecule-polarity",
                                description: "Simulacija koja pomaže u učenju polariteta molekula i elektronegativnosti.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Biologija",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Stanice",
                        games: [
                            {
                                name: "Cells Games - BioMan Biology",
                                link: "https://biomanbio.com/HTML5GamesandLabs/Cellgames/Cells.html",
                                description: "Interaktivne igre koje pomažu učenicima učiti o građi i funkcijama stanica, uključujući stanične organele i procese poput transporta tvari.",
                            },
                            {
                                name: "CellCraft",
                                link: "https://cellcraftgame.com/",
                                description: "Igra u kojoj učenici upravljaju funkcijama stanice, poput stvaranja proteina i obrane od virusa.",
                            },
                        ],
                    },
                    {
                        name: "Biokemija",
                        games: [
                            {
                                name: "Life Chemistry Games - BioMan Biology",
                                link: "https://biomanbio.com/HTML5GamesandLabs/LifeChemgames/lifechem.html",
                                description: "Igre o osnovama biokemije, poput molekula života (ugljikohidrati, lipidi, proteini i nukleinske kiseline).",
                            },
                        ],
                    },
                    {
                        name: "Fotosinteza i disanje",
                        games: [
                            {
                                name: "Photosynthesis and Respiration Games - BioMan Biology",
                                link: "https://biomanbio.com/HTML5GamesandLabs/PhotoRespgames/photoresp.html",
                                description: "Igre za razumijevanje procesa fotosinteze i staničnog disanja.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Genetika",
                        games: [
                            {
                                name: "Genetics Games - BioMan Biology",
                                link: "https://biomanbio.com/HTML5GamesandLabs/Genegames/genetics.html",
                                description: "Igre za učenje genetike, uključujući nasljeđivanje, Mendelove zakone i analizu rodoslovlja.",
                            },
                            {
                                name: "Gene Expression Essentials (PhET)",
                                link: "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_all.html",
                                description: "Simulacija koja objašnjava proces ekspresije gena i sintezu proteina.",
                            },
                            {
                                name: "NOVA RNA Lab",
                                link: "https://www.pbs.org/wgbh/nova/labs//lab/rna/research#/vlab/home",
                                description: "Interaktivna simulacija koja objašnjava strukturu i funkciju RNA molekula.",
                            },
                        ],
                    },
                    {
                        name: "Fiziologija",
                        games: [
                            {
                                name: "Physiology Games - BioMan Biology",
                                link: "https://biomanbio.com/HTML5GamesandLabs/Physiologygames/physiology.html",
                                description: "Igre za učenje ljudske fiziologije, uključujući rad srca, pluća i probavnog sustava.",
                            },
                            {
                                name: "The Blood Typing Game (Nobel Prize)",
                                link: "https://www.nobelprize.org/educational/medicine/bloodtypinggame/",
                                description: "Interaktivna igra koja uči o krvnim grupama i procesu transfuzije krvi.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Evolucija",
                        games: [
                            {
                                name: "Evolution Games - BioMan Biology",
                                link: "https://biomanbio.com/HTML5GamesandLabs/EvoClassGames/evolution.html",
                                description: "Igre i simulacije vezane uz evoluciju, prirodnu selekciju i prilagodbe organizama.",
                            },
                            {
                                name: "Natural Selection (PhET)",
                                link: "https://phet.colorado.edu/en/simulation/legacy/natural-selection",
                                description: "Simulacija koja prikazuje kako prirodna selekcija oblikuje populacije organizama.",
                            },
                            {
                                name: "NOVA Evolution Lab",
                                link: "https://www.pbs.org/wgbh/nova/labs//lab/evolution/research#/chooser",
                                description: "Interaktivna simulacija evolucije kroz prirodnu selekciju i filogeniju.",
                            },
                        ],
                    },
                    {
                        name: "Ekologija",
                        games: [
                            {
                                name: "Ecology Games - BioMan Biology",
                                link: "https://biomanbio.com/HTML5GamesandLabs/EcoGames/ecology.html",
                                description: "Igre koje pokrivaju ekološke teme poput energetskih piramida, hranidbenih lanaca i odnosa u ekosustavima.",
                            },
                            {
                                name: "PhyloGame",
                                link: "http://phylogame.org/",
                                description: "Kartaška igra koja educira o biološkoj raznolikosti i ekosustavima.",
                            },
                            {
                                name: "Biology Simulations",
                                link: "https://www.biologysimulations.com/simulations",
                                description: "Kolekcija simulacija koje pokrivaju teme poput populacijske genetike, evolucije i ekosustava.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Znanstvena metoda",
                        games: [
                            {
                                name: "Scientific Method Games - BioMan Biology",
                                link: "https://biomanbio.com/HTML5GamesandLabs/SciMethodGames/scimethod.html",
                                description: "Igre za učenje znanstvenog metoda, uključujući eksperimentiranje i analizu podataka.",
                            },
                            {
                                name: "Gizmo - ExploreLearning",
                                link: "https://gizmos.explorelearning.com/find-gizmos/launch-gizmo?resourceId=635",
                                description: "Platforma s raznim simulacijama za učenje o staničnim procesima, genetici i ekosustavima.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Povijest",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Drevne civilizacije",
                        games: [
                            {
                                name: "World History Atlas",
                                link: "https://worldhist.org/",
                                description: "Nudi pregled povijesnih događaja kroz interaktivne mape koje sadrže kratku povijest o državama i regijama koje istražujemo.",
                            },
                            {
                                name: "Wordwall - Povijesne igre",
                                link: "https://wordwall.net/hr-hr/community/povijest/5-razred-olimpijske-igre",
                                description: "Platforma za interaktivne povijesne kvizove, igre i aktivnosti.",
                            },
                        ],
                    },
                    {
                        name: "Stara Grčka",
                        games: [
                            {
                                name: "Vremenska crta starogrčke povijesti",
                                link: "https://www.teachingandlearningresources.co.uk/greektimeline.html",
                                description: "Interaktivna vremenska crta pruža pregled ključnih događaja u starogrčkoj povijesti.",
                            },
                            {
                                name: "Jeopardy igra: Pregled starogrčke povijesti",
                                link: "https://jeopardylabs.com/play/ancient-greece-review-game-1",
                                description: "Online verzija popularne igre Jeopardy fokusira se na pitanja vezana uz staru Grčku.",
                            },
                            {
                                name: "Kviz o staroj Grčkoj",
                                link: "https://www.teachingandlearningresources.co.uk/greeksquiz.shtml",
                                description: "Kviz koji provjerava znanje o različitim aspektima starogrčke povijesti.",
                            },
                        ],
                    },
                    {
                        name: "Perzijsko Carstvo",
                        games: [
                            {
                                name: "Jeopardy igra: Perzijsko Carstvo",
                                link: "https://jeopardylabs.com/play/persian-empire",
                                description: "Jeopardy igra fokusirana na povijest Perzijskog Carstva.",
                            },
                            {
                                name: "Battleship: Perzijsko Carstvo",
                                link: "https://www.quia.com/ba/65253.html",
                                description: "Kombinirajući klasičnu igru 'Potapanje brodova' s pitanjima o Perzijskom Carstvu.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Rimsko Carstvo",
                        games: [
                            {
                                name: "Križić-kružić: Rimljani",
                                link: "https://schoolhistory.co.uk/games/the-romans-noughts-and-crosses-game/",
                                description: "Verzija igre 'križić-kružić' s pitanjima o Rimskom Carstvu.",
                            },
                            {
                                name: "Trivia Fling: Rimljani",
                                link: "https://schoolhistory.co.uk/games/roman-trivia-fling-teacher-game/",
                                description: "Trivia igra s pitanjima o Rimskom Carstvu.",
                            },
                            {
                                name: "Kviz: Poglavlje 13 - Rim",
                                link: "https://www.quia.com/jg/122300list.html",
                                description: "Kviz s pitanjima o rimskim carevima, vojnoj strategiji i svakodnevnom životu Rimljana.",
                            },
                        ],
                    },
                    {
                        name: "Drevni Egipat",
                        games: [
                            {
                                name: "Kviz: Povijest drevnog Egipta",
                                link: "https://www.historyforkids.net/quiz/egyptian-history.html/",
                                description: "Kviz koji pokriva povijest Egipta, od prvih dinastija do pada posljednjih faraona.",
                            },
                            {
                                name: "Kviz: Egipatska znanost",
                                link: "https://www.historyforkids.net/quiz/egyptian-science-quiz.html/",
                                description: "Fokus na znanstvena postignuća Egipta, uključujući astronomiju, medicinu i tehnologiju.",
                            },
                            {
                                name: "Jeopardy: Drevni Egipat",
                                link: "https://jeopardylabs.com/play/ancient-egypt67",
                                description: "Jeopardy igra s pitanjima o povijesti, kulturi i znanosti drevnog Egipta.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Srednji vijek",
                        games: [
                            {
                                name: "Bitke srednjeg vijeka: Aktivnost za djecu",
                                link: "https://www.rct.uk/resources/bring-on-the-battle-childrens-activity",
                                description: "Simulacija bitaka srednjeg vijeka, omogućuje razumijevanje strategija i izazova vojnih sukoba.",
                            },
                        ],
                    },
                    {
                        name: "Renašansa i otkrića",
                        games: [
                            {
                                name: "Vremenska crta istraživača",
                                link: "https://mrnussbaum.com/explorers-timeline",
                                description: "Interaktivna vremenska crta koja prikazuje ključne ekspedicije i istraživače.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Prvi svjetski rat",
                        games: [
                            {
                                name: "Over the Top – Interaktivna avantura",
                                link: "https://www.warmuseum.ca/overthetop/game/",
                                description: "Igra koja simulira život u rovovima tijekom Prvog svjetskog rata.",
                            },
                            {
                                name: "Vremenska crta Prvog svjetskog rata – MrNussbaum",
                                link: "https://mrnussbaum.com/world-war-i-timeline-game",
                                description: "Interaktivna vremenska crta ključnih događaja Prvog svjetskog rata.",
                            },
                        ],
                    },
                    {
                        name: "Drugi svjetski rat",
                        games: [
                            {
                                name: "Drugi svjetski rat – TinyTap",
                                link: "https://www.tinytap.com/activities/g1erd/play/world-war-ii",
                                description: "Interaktivna lekcija o ključnim događajima i bitkama Drugog svjetskog rata.",
                            },
                            {
                                name: "Kviz: Karta Drugog svjetskog rata",
                                link: "https://www.purposegames.com/game/world-war-ii-map-quiz",
                                description: "Kviz koji testira znanje o geografiji Drugog svjetskog rata.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Njemački",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Osnovni vokabular",
                        games: [
                            {
                                name: "Digital Dialects: German",
                                link: "https://www.digitaldialects.com/German.htm",
                                description: "Interaktivna platforma koja nudi razne igre i aktivnosti za učenje osnovnog vokabulara i gramatike njemačkog jezika.",
                            },
                            {
                                name: "Babadum",
                                link: "https://babadum.com/play/?lang=3&game=1",
                                description: "Vizualno privlačna platforma za učenje njemačkog vokabulara kroz slike i jednostavne igre prepoznavanja riječi.",
                            },
                        ],
                    },
                    {
                        name: "Boje i brojevi",
                        games: [
                            {
                                name: "German Games",
                                link: "https://www.german-games.net/",
                                description: "Web stranica koja pruža besplatne igre za učenje tema poput boja, brojeva i svakodnevnih fraza.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Osnovne fraze",
                        games: [
                            {
                                name: "German Games",
                                link: "https://www.german-games.net/",
                                description: "Igre koje pokrivaju osnovne fraze i svakodnevne izraze za početnike.",
                            },
                            {
                                name: "Duolingo: Učenje njemačkog jezika",
                                link: "https://www.duolingo.com/learn",
                                description: "Popularna platforma za učenje njemačkog jezika kroz vježbe slušanja, čitanja i pisanja.",
                            },
                        ],
                    },
                    {
                        name: "Osnovna gramatika",
                        games: [
                            {
                                name: "Grammatikspiele: Njemačka gramatika kroz igre",
                                link: "https://www.grammatikdeutsch.de/html/grammatikspiele.html",
                                description: "Stranica za učenje osnovne njemačke gramatike kroz interaktivne igre.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Napredna gramatika",
                        games: [
                            {
                                name: "Grammatikspiele: Njemačka gramatika kroz igre",
                                link: "https://www.grammatikdeutsch.de/html/grammatikspiele.html",
                                description: "Napredne igre za učenje njemačke gramatike, uključujući zadatke s padežima i glagolima.",
                            },
                            {
                                name: "Duolingo: Učenje njemačkog jezika",
                                link: "https://www.duolingo.com/learn",
                                description: "Napredne lekcije kroz kratke igre i kvizove s fokusom na gramatiku i vokabular.",
                            },
                        ],
                    },
                    {
                        name: "Proširenje vokabulara",
                        games: [
                            {
                                name: "Babadum",
                                link: "https://babadum.com/play/?lang=3&game=1",
                                description: "Platforma za proširenje vokabulara kroz slike i igre, pogodna za srednje napredne učenike.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Napredne fraze i izrazi",
                        games: [
                            {
                                name: "German Games",
                                link: "https://www.german-games.net/",
                                description: "Igre za učenje složenijih fraza i svakodnevnih izraza.",
                            },
                            {
                                name: "Duolingo: Učenje njemačkog jezika",
                                link: "https://www.duolingo.com/learn",
                                description: "Napredne aktivnosti za učenje složenih fraza i gramatike.",
                            },
                        ],
                    },
                    {
                        name: "Gramatika u kontekstu",
                        games: [
                            {
                                name: "Grammatikspiele: Njemačka gramatika kroz igre",
                                link: "https://www.grammatikdeutsch.de/html/grammatikspiele.html",
                                description: "Interaktivne igre koje pomažu učenicima primijeniti gramatiku u stvarnim situacijama.",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "Geografija",
        razredi: [
            {
                name: "1. Razred",
                gradivo: [
                    {
                        name: "Reljef i oblici kopna",
                        games: [
                            {
                                name: "Landforms Quiz (ProProfs)",
                                link: "https://www.proprofs.com/quiz-school/story.php?title=landforms-quiz",
                                description: "Kviz o različitim oblicima reljefa, uključujući planine, doline i visoravni.",
                            },
                            {
                                name: "Geography 101: Landforms (ProProfs)",
                                link: "https://www.proprofs.com/quiz-school/story.php?title=1dq-geography-101-landforms",
                                description: "Uvodni kviz o formiranju oblika kopna, s fokusom na procese koji stvaraju planine i doline.",
                            },
                            {
                                name: "Mountains Quiz (The Guardian)",
                                link: "https://www.theguardian.com/travel/2020/may/29/take-a-peak-at-our-mountains-quiz",
                                description: "Kviz o poznatim svjetskim planinama i njihovim zanimljivostima.",
                            },
                        ],
                    },
                    {
                        name: "Rijeke, jezera i vodena tijela",
                        games: [
                            {
                                name: "Rivers Quiz (Fact Monster)",
                                link: "https://www.factmonster.com/take-quiz/rivers",
                                description: "Kviz o najvećim svjetskim rijekama, njihovim pritokama i povijesnom značaju.",
                            },
                            {
                                name: "World Lakes Quiz (World Geography Games)",
                                link: "https://world-geography-games.com/en/world_lakes.html",
                                description: "Interaktivna igra o najvećim svjetskim jezerima, njihovoj lokaciji i značaju.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "2. Razred",
                gradivo: [
                    {
                        name: "Klima i atmosferski fenomeni",
                        games: [
                            {
                                name: "Vrste klima (PurposeGames)",
                                link: "https://www.purposegames.com/game/vrste-klima-kind-of-climates-quiz",
                                description: "Kviz o globalnim klimatskim zonama i njihovim karakteristikama.",
                            },
                            {
                                name: "Ruza vjetrova u Hrvatskoj (PurposeGames)",
                                link: "https://www.purposegames.com/game/ruza-vjetrova-u-hrvatskoj-quiz",
                                description: "Kviz o smjerovima i utjecaju vjetrova na područje Hrvatske.",
                            },
                            {
                                name: "Atmosphere Puzzle (Planeta42)",
                                link: "https://planeta42.com/geography/atmospherepuzzle/",
                                description: "Slagalica o slojevima atmosfere i njihovim funkcijama.",
                            },
                        ],
                    },
                    {
                        name: "Tektonske ploče i geologija",
                        games: [
                            {
                                name: "Tektonske ploče: Svjetska karta (PurposeGames)",
                                link: "https://www.purposegames.com/game/tectonic-plate-boundaries-world-map/hr",
                                description: "Kviz o granicama tektonskih ploča i njihovom utjecaju na reljef.",
                            },
                            {
                                name: "Types of Plutonic Rocks (PurposeGames)",
                                link: "https://www.purposegames.com/game/types-of-plutonic-rocks-quiz/hr",
                                description: "Kviz o vrstama plutonskih stijena i njihovoj ulozi u geološkim procesima.",
                            },
                            {
                                name: "Pangea Puzzle (Planeta42)",
                                link: "https://planeta42.com/geography/pangaeapuzzle/",
                                description: "Slagalica o razdvajanju superkontinenta Pangee.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "3. Razred",
                gradivo: [
                    {
                        name: "Povijest planeta i astronomija",
                        games: [
                            {
                                name: "Earth Structure Game (Planeta42)",
                                link: "https://planeta42.com/geography/earthstructure/",
                                description: "Igra o unutrašnjoj građi Zemlje, uključujući kore, plašt i jezgru.",
                            },
                            {
                                name: "Galaxy Types (Planeta42)",
                                link: "https://planeta42.com/astronomy/galaxytypes/",
                                description: "Istraživanje tipova galaksija kroz interaktivnu slagalicu.",
                            },
                            {
                                name: "Solar Puzzle (Planeta42)",
                                link: "https://planeta42.com/astronomy/solarPuzzle/",
                                description: "Slagalica o strukturi Sunčevog sustava i rasporedu planeta.",
                            },
                        ],
                    },
                    {
                        name: "Opća geografija",
                        games: [
                            {
                                name: "Geoguessr: Globalna geografija",
                                link: "https://www.geoguessr.com/",
                                description: "Igra koja testira geografsko znanje prepoznavanjem lokacija na panoramskim slikama.",
                            },
                            {
                                name: "Geoguessr: Priobalne regije",
                                link: "https://www.geoguessr.com/vgp/3245",
                                description: "Verzija igre Geoguessr fokusirana na priobalne regije.",
                            },
                        ],
                    },
                ],
            },
            {
                name: "4. Razred",
                gradivo: [
                    {
                        name: "Reljef i vanjski procesi",
                        games: [
                            {
                                name: "Vanjski procesi reljefa (PurposeGames)",
                                link: "https://www.purposegames.com/game/vanjski-procesi-reljefa-external-relief-processes",
                                description: "Kviz o procesima erozije, taloženja i formiranja reljefa.",
                            },
                            {
                                name: "Landform Review (JeopardyLabs)",
                                link: "https://jeopardylabs.com/play/landform-review-14",
                                description: "Jeopardy igra za ponavljanje oblika reljefa, uključujući visoravni, doline i kanjone.",
                            },
                        ],
                    },
                    {
                        name: "Rijeke i vodeni tokovi",
                        games: [
                            {
                                name: "Morske struje u svijetu (PurposeGames)",
                                link: "https://www.purposegames.com/game/morske-struje-u-svijetu-marine-currents",
                                description: "Kviz o glavnim morskim strujama i njihovoj ulozi u klimatskim procesima.",
                            },
                            {
                                name: "Rijeke Europe (PurposeGames)",
                                link: "https://www.purposegames.com/game/rijeke-europeigra-na-hrvatskom-jeziku-game",
                                description: "Interaktivni kviz za prepoznavanje glavnih rijeka Europe.",
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
                    isSearchMode ? null : <IconButton onClick={() => setOpen(!open)}>
                        {open || isSearchMode ? <KeyboardArrowUpIcon/> : <ExpandMoreIcon/>}
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
                                        Otvori
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
                    isSearchMode ? null : <IconButton onClick={() => setOpen(!open)}>
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
    const [openAll, setOpenAll] = useState(false);

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
                    isSearchMode ? null : <Stack direction="row" spacing={2}>
                        <IconButton onClick={() => setOpenAll(!openAll)}>
                            {openAll ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}
                        </IconButton>
                        {!openAll && <IconButton onClick={() => setOpen(!open)}>
                            {open || isSearchMode ? <KeyboardArrowUpIcon/> : <ExpandMoreIcon/>}
                        </IconButton>}
                    </Stack>
                }
            />
            <Collapse in={open || isSearchMode || openAll}>
                <CardContent>
                    {razredi.map((razred, idx) => (
                        <RazredPanel key={idx} name={razred.name} gradivo={razred.gradivo}
                                     isSearchMode={isSearchMode || openAll}/>
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

const useDebounce = <T, >(initialState: T, timout = 300): [T, (t: T) => void, T] => {
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

const Search = ({onChange}: { onChange: (search: string) => void }) => {
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
                        return (game.name.toLowerCase() + game.description.toLowerCase()).includes(search.toLowerCase());
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
                    Serious Games Edukacijski Portal
                </Typography>
                <Typography variant="subtitle1" align="center" paragraph>
                    Kliknite na predmet, zatim odaberite razred i gradivo kako biste pronašli
                    pripadajuće igre, simulacije i kvizove.
                </Typography>

                <Search onChange={setSearch}/>

                {toShow.map((subject) => (
                    <SubjectPanel key={subject.name} name={subject.name} razredi={subject.razredi}
                                  isSearchMode={isSearchMode}/>
                ))}

                <Typography variant="body2" align="center" sx={{mt: 4}}>
                    &copy; Tehnologije E-Učenja Serious Games
                </Typography>

            </Container>
        </ThemeProvider>
    );
};

export default App;