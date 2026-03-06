import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'drg8ezbe',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
})

async function seed() {
  console.log('Seeding Sanity...')

  // Site Settings
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    heroTagline: 'Clarity in Complexity.',
    heroSubtitle: 'Humanity in scale.',
    heroBlurb: 'I build products for millions of people — and I still think about each one of them.',
    aboutParagraphs: [
      'I build products that work for real people — inside organizations that aren\'t always designed to make that easy. That\'s what drew me to product in the first place: solving hard problems at scale without losing sight of the humans who actually use the product.',
      'Before product, I studied Molecular Biology and Entrepreneurship at SFU — which is really about understanding complex systems and figuring out where to intervene. I\'ve tried a few ways of doing that: business development, agency work in London, and now healthcare product management. Each chapter taught me something about strategy, collaboration, and making ideas real.',
      'At TELUS Health, I lead AI strategy for clinicians. At Pacific Blue Cross, I redesigned SMB benefits for micro-businesses and solopreneurs. At Tribal DDB, I built a new business function and led digital product development — helping clients believe in ideas before they existed and turning concepts into tangible experiences. Across all of it, the lesson has been the same: good product starts with listening, seeing clearly, and moving carefully — but confidently.',
    ],
    contactText: 'I\'m happy to connect — whether you\'re curious about the work, want to talk through a product problem, or just want to compare notes on building responsibly in healthcare.',
  })
  console.log('✓ Site Settings')

  // Case Studies
  const caseStudies = [
    {
      _id: 'caseStudy-telus-1',
      _type: 'caseStudy',
      title: 'Inbox Triage: The first GenAI in our EMR',
      company: 'Telus Health',
      dates: '2023 — Present',
      category: 'ai',
      summary: 'Clinicians were drowning in documents — lab results, consult notes, patient messages. The challenge wasn\'t just automating tasks; it was doing it safely, accurately, and in a way that clinicians would actually trust.',
      bullets: [
        'I led the product strategy, deciding where GenAI could responsibly operate, how to validate it, and how to integrate human oversight. We also created the commercial packaging to make it sustainable.',
        '2.4M+ documents processed with 96% validated accuracy. This first GenAI feature proved the technology could scale safely inside a regulated clinical system.',
      ],
      order: 1,
    },
    {
      _id: 'caseStudy-telus-2',
      _type: 'caseStudy',
      title: 'Agentic AI: Changing how clinicians work',
      company: 'Telus Health',
      dates: '2023 — Present',
      category: 'ai',
      summary: 'Assistive AI reduces clicks. Agentic AI changes workflows. We designed AI to actively reshape documentation, billing, and chart review, with safe guardrails built in.',
      bullets: [
        'I defined the 0→1 product vision, identified high-impact use cases, and set adoption and trust as primary measures of success. Partnering across engineering, clinical UX, and compliance, we turned strategy into reality.',
        '2.2K+ accepted AI suggestions in early beta — moving AI from a helper to a workflow-transformer.',
        'Commercial impact: By designing pricing and packaging around clinic size and workflow volume, AI achieved a 25% attach rate in new sales and $1.5M+ ARR in year one.',
      ],
      order: 2,
    },
    {
      _id: 'caseStudy-pbc-1',
      _type: 'caseStudy',
      title: 'Redesigning SMB Benefits for solopreneurs, contractors, and micro-businesses',
      company: 'Pacific Blue Cross',
      dates: '2019 — 2023',
      category: 'strategy',
      summary: 'Small businesses often get overlooked in insurance plan design. Our SMB benefits portfolio was misaligned, with high churn and low adoption.',
      bullets: [
        'I led the strategic redesign, introducing flexible plan designs, virtual care benefits, mental health coverage, and options for solopreneurs and contractors — all while collaborating with pricing, actuarial, underwriting, operations, and sales to ensure feasibility, compliance, and profitability.',
        'The redesigned portfolio drove 70% YoY sales growth, and the virtual care benefit reduced employer churn by 25% while increasing sales 40% YoY.',
        'Even in a regulated environment, thoughtful, human-centered plan design drives adoption, retention, and real business outcomes.',
      ],
      order: 3,
    },
    {
      _id: 'caseStudy-tribal-1',
      _type: 'caseStudy',
      title: 'New business, digital products, new city',
      company: 'Tribal DDB',
      dates: '2016 — 2019',
      category: 'strategy',
      summary: 'At Tribal DDB London, I owned client accounts end-to-end while leading digital product development. The challenge: get people to believe in ideas that didn\'t exist yet, and then turn those ideas into tangible digital experiences.',
      bullets: [
        'I partnered with creative, UX, and tech teams to define concepts, pitch them to clients, and bring them to life — bridging strategy, design, and execution in a way that felt human and credible.',
        'Over three years, this approach generated £20M+ in new business and multi-year contracts with Disney, Volkswagen, and GSK. Beyond the numbers, it taught me how to storytell, align cross-functionally, and turn concepts into products people actually use — lessons I carry into every product I lead.',
      ],
      order: 4,
    },
  ]

  for (const cs of caseStudies) {
    await client.createOrReplace(cs)
    console.log(`✓ Case Study: ${cs.title}`)
  }

  console.log('\nAll done! Your content is now live in Sanity.')
}

seed().catch(console.error)
