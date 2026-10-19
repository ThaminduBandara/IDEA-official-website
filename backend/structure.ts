import type {StructureResolver} from 'sanity/structure'
import {
  AlertCircle,
  Sparkles,
  BookOpen,
  Briefcase,
  Newspaper,
  Flame,
  GraduationCap,
  Users,
  FileDown,
  PhoneCall,
  LayoutTemplate,
  Mail,
  Home,
  CheckCircle2,
  FileText,
  FolderOpen,
  Camera,
} from 'lucide-react'

// Known singleton document IDs in the production dataset
const SINGLETON_IDS = {
  aboutInfo: '6538b1cd-4c79-4730-8f0e-ab93cac6a1b0',
  projectsPage: 'a22e7adc-1934-4da4-879e-ca4994e89310',
  newsPage: '56e37c2d-aeca-4e91-ac36-4a94314898a8',
  downloadsPage: '51dc90d0-2d23-4ab7-b9a3-7be11897eca3',
  contactPage: '79f64f4e-4f6b-4063-a70c-7ce5729af99f',
  technologiesPage: 'technologiesPage',
  trainingPage: 'trainingPage',
  galleryPage: 'galleryPage',
  mobileKitchenAd: 'mobileKitchenAd',
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('IDEA Sri Lanka CMS')
    .items([
      // 1. APPROVALS WORKFLOW (Top Priority Review Queue)
      S.listItem()
        .title('🟠 Needs Client Review')
        .icon(AlertCircle)
        .child(
          S.documentList()
            .title('🟠 Documents Awaiting Client Review')
            .filter('reviewStatus == "readyForReview"')
        ),

      S.divider(),

      // 2. HOME PAGE (Hero Slideshow & Mobile Kitchen Advertisement)
      S.listItem()
        .title('🏠 Home Page')
        .icon(Home)
        .child(
          S.list()
            .title('🏠 Home Page Management')
            .items([
              S.listItem()
                .title('🖼️ Hero Carousel Slides')
                .icon(Sparkles)
                .child(
                  S.documentTypeList('heroSlide').title('🖼️ Homepage Hero Slides')
                ),
              S.listItem()
                .title('🍳 Mobile Kitchen Spotlight (Advertisement)')
                .icon(Flame)
                .child(
                  S.document()
                    .schemaType('mobileKitchenAd')
                    .documentId(SINGLETON_IDS.mobileKitchenAd)
                    .title('🍳 Mobile Kitchen Commercial Spotlight')
                ),
            ])
        ),

      // 3. ABOUT US (1-Click Direct Form: Vision, Mission, Leadership & Staff)
      S.listItem()
        .title('ℹ️ About Us')
        .icon(BookOpen)
        .child(
          S.document()
            .schemaType('aboutInfo')
            .documentId(SINGLETON_IDS.aboutInfo)
            .title('ℹ️ About Us (Vision, Leadership & Staff)')
        ),

      S.divider(),

      // 4. PROJECTS (Banner + All Projects)
      S.listItem()
        .title('💼 Projects')
        .icon(Briefcase)
        .child(
          S.list()
            .title('💼 Projects Management')
            .items([
              S.listItem()
                .title('🎨 Page Banner & Stats')
                .icon(LayoutTemplate)
                .child(
                  S.document()
                    .schemaType('projectsPage')
                    .documentId(SINGLETON_IDS.projectsPage)
                    .title('🎨 Projects Banner & Stats')
                ),
              S.listItem()
                .title('📂 All Project Items')
                .icon(FolderOpen)
                .child(
                  S.documentTypeList('project').title('📂 Projects Portfolio')
                ),
            ])
        ),

      // 5. NEWS & EVENTS (Banner + Articles)
      S.listItem()
        .title('📰 News & Events')
        .icon(Newspaper)
        .child(
          S.list()
            .title('📰 News & Events Management')
            .items([
              S.listItem()
                .title('🎨 Page Banner & Stats')
                .icon(LayoutTemplate)
                .child(
                  S.document()
                    .schemaType('newsPage')
                    .documentId(SINGLETON_IDS.newsPage)
                    .title('🎨 News Page Banner & Stats')
                ),
              S.listItem()
                .title('📝 News & Workshop Items')
                .icon(FileText)
                .child(
                  S.documentTypeList('news').title('📝 News & Events Articles')
                ),
            ])
        ),

      // 6. MEDIA & GALLERY (Banner + Photos & Videos)
      S.listItem()
        .title('📸 Media & Gallery')
        .icon(Camera)
        .child(
          S.list()
            .title('📸 Media & Gallery Management')
            .items([
              S.listItem()
                .title('🎨 Page Banner & Stats')
                .icon(LayoutTemplate)
                .child(
                  S.document()
                    .schemaType('galleryPage')
                    .documentId(SINGLETON_IDS.galleryPage)
                    .title('🎨 Gallery Page Banner & Stats')
                ),
              S.listItem()
                .title('🎞️ All Photos & Videos')
                .icon(Camera)
                .child(
                  S.documentTypeList('galleryItem').title('🎞️ Photo & Video Gallery')
                ),
            ])
        ),

      // 7. RENEWABLE TECHNOLOGIES (Banner + Technologies)
      S.listItem()
        .title('⚡ Renewable Technologies')
        .icon(Flame)
        .child(
          S.list()
            .title('⚡ Technologies Management')
            .items([
              S.listItem()
                .title('🎨 Page Banner & Stats')
                .icon(LayoutTemplate)
                .child(
                  S.document()
                    .schemaType('technologiesPage')
                    .documentId(SINGLETON_IDS.technologiesPage)
                    .title('🎨 Technologies Banner & Stats')
                ),
              S.listItem()
                .title('🛠️ Technology Portfolio')
                .icon(Flame)
                .child(
                  S.documentTypeList('technology').title('🛠️ Technologies Portfolio')
                ),
            ])
        ),

      // 7. TRAINING & TRAINEES (Banner + Programs + Stories)
      S.listItem()
        .title('🎓 Training & Trainees')
        .icon(GraduationCap)
        .child(
          S.list()
            .title('🎓 Training Management')
            .items([
              S.listItem()
                .title('🎨 Page Banner & Stats')
                .icon(LayoutTemplate)
                .child(
                  S.document()
                    .schemaType('trainingPage')
                    .documentId(SINGLETON_IDS.trainingPage)
                    .title('🎨 Training Banner & Stats')
                ),
              S.listItem()
                .title('📚 Training Programs')
                .icon(GraduationCap)
                .child(
                  S.documentTypeList('trainingProgram').title('📚 Training Programs')
                ),
              S.listItem()
                .title('💬 Trainee Testimonials')
                .icon(Users)
                .child(
                  S.documentTypeList('traineeStory').title('💬 Trainee Stories & Quotes')
                ),
            ])
        ),

      // 8. DOWNLOADS & RESOURCES (Banner + Files)
      S.listItem()
        .title('📥 Downloads & Resources')
        .icon(FileDown)
        .child(
          S.list()
            .title('📥 Downloads Management')
            .items([
              S.listItem()
                .title('🎨 Page Banner & Stats')
                .icon(LayoutTemplate)
                .child(
                  S.document()
                    .schemaType('downloadsPage')
                    .documentId(SINGLETON_IDS.downloadsPage)
                    .title('🎨 Downloads Banner & Stats')
                ),
              S.listItem()
                .title('📄 Downloadable Files')
                .icon(FileDown)
                .child(
                  S.documentTypeList('download').title('📄 Downloads Library')
                ),
            ])
        ),

      S.divider(),

      // 9. CONTACT & OFFICES (1-Click Direct Form: Details, Offices & FAQs)
      S.listItem()
        .title('📞 Contact & Offices')
        .icon(PhoneCall)
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId(SINGLETON_IDS.contactPage)
            .title('📞 Contact Details, Offices & FAQs')
        ),
    ])
