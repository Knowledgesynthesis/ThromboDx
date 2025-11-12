import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export function References() {
  const references = [
    {
      category: 'TTP & ADAMTS13',
      items: [
        {
          citation:
            'Bendapudi PK, et al. Derivation and external validation of the PLASMIC score for rapid assessment of adults with thrombotic microangiopathies: a cohort study. Lancet Haematol. 2017;4(4):e157-e164.',
          year: 2017,
        },
        {
          citation:
            'Scully M, et al. Caplacizumab treatment for acquired thrombotic thrombocytopenic purpura. N Engl J Med. 2019;380(4):335-346.',
          year: 2019,
        },
        {
          citation:
            'Zheng XL, et al. ISTH guidelines for treatment of thrombotic thrombocytopenic purpura. J Thromb Haemost. 2020;18(10):2496-2502.',
          year: 2020,
        },
      ],
    },
    {
      category: 'DIC',
      items: [
        {
          citation:
            'Taylor FB Jr, et al. Towards definition, clinical and laboratory criteria, and a scoring system for disseminated intravascular coagulation. Thromb Haemost. 2001;86(5):1327-1330.',
          year: 2001,
        },
        {
          citation:
            'Levi M, Ten Cate H. Disseminated intravascular coagulation. N Engl J Med. 1999;341(8):586-592.',
          year: 1999,
        },
        {
          citation:
            'Levi M, et al. Guidelines for the diagnosis and management of disseminated intravascular coagulation. Br J Haematol. 2009;145(1):24-33.',
          year: 2009,
        },
      ],
    },
    {
      category: 'ITP',
      items: [
        {
          citation:
            'Neunert C, et al. American Society of Hematology 2019 guidelines for immune thrombocytopenia. Blood Adv. 2019;3(23):3829-3866.',
          year: 2019,
        },
        {
          citation:
            'Provan D, et al. Updated international consensus report on the investigation and management of primary immune thrombocytopenia. Blood Adv. 2019;3(22):3780-3817.',
          year: 2019,
        },
      ],
    },
    {
      category: 'HUS',
      items: [
        {
          citation:
            'Loirat C, Fakhouri F, Ariceta G, et al. An international consensus approach to the management of atypical hemolytic uremic syndrome in children. Pediatr Nephrol. 2016;31(1):15-39.',
          year: 2016,
        },
        {
          citation:
            'Legendre CM, et al. Terminal complement inhibitor eculizumab in atypical hemolytic-uremic syndrome. N Engl J Med. 2013;368(23):2169-2181.',
          year: 2013,
        },
        {
          citation:
            'Wong CS, Jelacic S, Habeeb RL, et al. The risk of the hemolytic-uremic syndrome after antibiotic treatment of Escherichia coli O157:H7 infections. N Engl J Med. 2000;342(26):1930-1936.',
          year: 2000,
        },
      ],
    },
    {
      category: 'Thrombotic Microangiopathies - General',
      items: [
        {
          citation:
            'George JN, Nester CM. Syndromes of thrombotic microangiopathy. N Engl J Med. 2014;371(7):654-666.',
          year: 2014,
        },
        {
          citation:
            'Joly BS, et al. Thrombotic thrombocytopenic purpura. Blood. 2017;129(21):2836-2846.',
          year: 2017,
        },
      ],
    },
    {
      category: 'Hemostasis & Coagulation',
      items: [
        {
          citation:
            'Hoffman M, Monroe DM. A cell-based model of hemostasis. Thromb Haemost. 2001;85(6):958-965.',
          year: 2001,
        },
        {
          citation:
            'Machlus KR, Italiano JE Jr. The incredible journey: From megakaryocyte development to platelet formation. J Cell Biol. 2013;201(6):785-796.',
          year: 2013,
        },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">References</h1>
        <p className="text-muted-foreground">
          Key literature and guidelines for DIC, TTP, ITP, and HUS
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About These References</CardTitle>
          <CardDescription>Evidence-based content sources</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            All content in ThromboLens is based on peer-reviewed literature, society guidelines,
            and expert consensus statements. References are organized by topic and include
            publication year to help assess currency of evidence.
          </p>
        </CardContent>
      </Card>

      {references.map((section) => (
        <Card key={section.category}>
          <CardHeader>
            <CardTitle className="text-xl">{section.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {section.items.map((ref, idx) => (
                <li key={idx} className="text-sm">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 text-muted-foreground font-mono">
                      [{idx + 1}]
                    </span>
                    <div className="flex-1">
                      <p className="text-foreground">{ref.citation}</p>
                      <span className="text-xs text-muted-foreground">Year: {ref.year}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <h4 className="font-semibold mb-1">Professional Societies</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>American Society of Hematology (ASH)</li>
              <li>International Society on Thrombosis and Haemostasis (ISTH)</li>
              <li>American Society for Clinical Pathology (ASCP)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Online Resources</h4>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>UpToDate - Peer-reviewed clinical reference</li>
              <li>PubMed - National Library of Medicine database</li>
              <li>Hematology.org - ASH educational content</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Citation Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            All clinical recommendations and diagnostic criteria in ThromboLens are cited to their
            primary sources. Version years are prominently displayed to help users assess whether
            newer guidelines are available.
          </p>
          <p>
            If you notice outdated content or would like to suggest additional references, please
            contact the development team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
