
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

interface StudyDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  content?: string;
}

const SAMPLE_DOCUMENTS: StudyDocument[] = [
  {
    id: '1',
    title: 'Airplane Flying Handbook',
    category: 'pilot',
    description: 'Fundamental skills required to fly airplanes',
    content: `# Airplane Flying Handbook\n\n## Chapter 1: Introduction to Flight Training\n\nLearning to fly an aircraft can be an exhilarating experience. This handbook is designed to help student pilots learn the basic principles of flight and the skills necessary to fly airplanes safely.\n\n### The Path to Becoming a Pilot\n\nFlight training typically follows a structured path. Student pilots begin by learning basic aircraft control in straight and level flight, turns, climbs, and descents. As skills improve, students progress to more advanced maneuvers, takeoffs, and landings.\n\n### Role of the Instructor\n\nThe flight instructor serves as a mentor who demonstrates flight maneuvers, teaches aviation knowledge, and evaluates student performance. A good working relationship with your instructor is key to successful training.\n\n## Chapter 2: Ground Operations\n\n### Preflight Inspection\n\nBefore each flight, a thorough inspection of the airplane must be conducted to ensure it's airworthy and safe for flight. This inspection includes examining the:...(content continues)`
  },
  {
    id: '2',
    title: 'Pilot\'s Handbook of Aeronautical Knowledge',
    category: 'pilot',
    description: 'Essential knowledge for pilots',
    content: `# Pilot's Handbook of Aeronautical Knowledge\n\n## Chapter 1: Introduction to Flying\n\nAviation has evolved from a dream to a practical means of transportation and an exciting recreational activity. This handbook provides the basic knowledge essential for pilots.\n\n### History of Flight\n\nThe Wright brothers' first successful powered flight in 1903 marked the beginning of the aviation era. Since then, aircraft design and capabilities have advanced tremendously.\n\n### The Role of the FAA\n\nThe Federal Aviation Administration (FAA) oversees civil aviation in the United States. Its mission includes ensuring aviation safety and developing the nation's aviation system.\n\n## Chapter 2: Aircraft Structure\n\n### Major Components\n\nAircraft are made up of several major components:\n\n- Fuselage: The main body of the aircraft\n- Wings: Provide lift necessary for flight\n- Empennage: The tail section for stability and control\n- Landing gear: Supports the aircraft during takeoff, landing, and ground operations\n- Powerplant: Includes the engine and propeller\n\n### Aircraft Construction Materials\n\nModern aircraft use various materials including:...(content continues)`
  },
  {
    id: '3',
    title: 'Aviation Maintenance Technician Handbook - General',
    category: 'mechanic',
    description: 'Fundamental information for aviation mechanics',
    content: `# Aviation Maintenance Technician Handbook - General\n\n## Chapter 1: Mathematics in Aviation Maintenance\n\nMathematics is essential in aviation maintenance for tasks ranging from measuring components to calculating stresses and weights.\n\n### Types of Measurements\n\nAviation maintenance requires precise measurements using both U.S. customary and metric systems.\n\n### Converting Between Measurement Systems\n\nTechnicians must be able to convert between different measurement systems accurately.\n\n## Chapter 2: Aircraft Drawings\n\n### Reading and Interpreting Drawings\n\nAircraft maintenance relies heavily on technical drawings for repair and maintenance procedures.\n\n### Types of Drawings\n\n- Detail drawings\n- Assembly drawings\n- Installation drawings\n- Schematics\n- Block diagrams\n- Wiring diagrams\n\n### Drawing Standards\n\nStandard practices for dimensions, tolerances, and symbols ensure clear communication through drawings...(content continues)`
  },
  {
    id: '4',
    title: 'FAR/AIM',
    category: 'regulations',
    description: 'Federal Aviation Regulations and Aeronautical Information Manual',
    content: `# Federal Aviation Regulations / Aeronautical Information Manual\n\n## Part 61 - Certification: Pilots, Flight Instructors, and Ground Instructors\n\n### Subpart A - General\n\n§61.1 Applicability and definitions.\n\nThis part prescribes:\n(a) The requirements for issuing pilot, flight instructor, and ground instructor certificates and ratings; the conditions under which those certificates and ratings are necessary; and the privileges and limitations of those certificates and ratings.\n\n### Subpart B - Aircraft Ratings and Pilot Authorizations\n\n§61.5 Certificates and ratings issued under this part.\n\n(a) The following certificates are issued under this part to an applicant who satisfactorily accomplishes the training and certification requirements for the certificate sought:\n(1) Pilot certificates—\n(i) Student pilot.\n(ii) Sport pilot.\n(iii) Recreational pilot.\n(iv) Private pilot.\n(v) Commercial pilot.\n(vi) Airline transport pilot...(content continues)`
  },
  {
    id: '5',
    title: 'Aircraft Systems for Pilots',
    category: 'pilot',
    description: 'Understanding aircraft systems',
    content: `# Aircraft Systems for Pilots\n\n## Chapter 1: Powerplant Systems\n\n### Reciprocating Engines\n\nMost general aviation aircraft use reciprocating engines. These engines convert the reciprocating (up and down) motion of pistons into rotary motion to drive the propeller.\n\n#### Four-Stroke Cycle\n\nMost aircraft piston engines operate on the four-stroke cycle:\n1. Intake stroke\n2. Compression stroke\n3. Power stroke\n4. Exhaust stroke\n\n### Ignition Systems\n\nAircraft typically use dual magneto ignition systems for redundancy and reliability. Each cylinder has two spark plugs, each served by a separate magneto.\n\n#### Magneto Operation\n\nMagnetos are self-contained electrical generators that provide high-voltage current to the spark plugs. They operate independently of the aircraft's electrical system, ensuring ignition capability even during electrical system failure...(content continues)`
  }
];

const StudyMaterialsBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<StudyDocument | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  const filteredDocuments = SAMPLE_DOCUMENTS.filter(doc => 
    (activeCategory === 'all' || doc.category === activeCategory) &&
    (doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     doc.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDocumentClick = (document: StudyDocument) => {
    setSelectedDocument(document);
  };

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1 space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pilot">Pilot</TabsTrigger>
                <TabsTrigger value="mechanic">Mechanic</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <ScrollArea className="h-[calc(100vh-24rem)]">
              <div className="space-y-2">
                {filteredDocuments.map(doc => (
                  <Button
                    key={doc.id}
                    variant="ghost"
                    className={`w-full justify-start text-left p-3 ${selectedDocument?.id === doc.id ? 'bg-muted' : ''}`}
                    onClick={() => handleDocumentClick(doc)}
                  >
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{doc.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2 h-full">
        <Card className="h-full">
          <CardContent className="p-6 h-full">
            {selectedDocument ? (
              <ScrollArea className="h-[calc(100vh-14rem)]">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedDocument.title}</h2>
                  <p className="text-muted-foreground mb-6">{selectedDocument.description}</p>
                  <div className="prose max-w-none">
                    {selectedDocument.content?.split('\n').map((line, index) => {
                      if (line.startsWith('#')) {
                        const headingLevel = line.match(/^#+/)?.[0].length || 1;
                        const headingText = line.replace(/^#+\s*/, '');
                        const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements;
                        
                        return React.createElement(
                          HeadingTag, 
                          { key: index, className: `font-bold my-4 ${headingLevel === 1 ? 'text-xl' : 'text-lg'}` }, 
                          headingText
                        );
                      } else if (line.startsWith('- ')) {
                        return (
                          <li key={index} className="ml-4 mb-1">
                            {line.substring(2)}
                          </li>
                        );
                      } else if (line.length === 0) {
                        return <div key={index} className="h-4"></div>;
                      } else {
                        return <p key={index} className="mb-4">{line}</p>;
                      }
                    })}
                  </div>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="mb-4">
                  <Book className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium mb-2">Select a document to view</h3>
                <p className="text-muted-foreground">Choose from our collection of FAA study materials</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Needed for the Book icon
import { Book } from 'lucide-react';

export default StudyMaterialsBrowser;
