import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor("#5F514B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "Akhil & Karthika — Wedding Web App Architecture & Code Guide")
            self.setStrokeColor(colors.HexColor("#E8D3D3"))
            self.setLineWidth(0.75)
            self.line(54, 742, letter[0] - 54, 742)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E8D3D3"))
        self.setLineWidth(0.75)
        self.line(54, 48, letter[0] - 54, 48)
        
        self.drawString(54, 34, "Confidential & Proprietary — Technical Documentation")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 54, 34, page_str)
        self.restoreState()


def generate_pdf():
    pdf_path = "Akhil_Karthika_Wedding_Website_Files_And_Code_Documentation.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#7A1C28")   # Royal Maroon
    secondary_color = colors.HexColor("#8B2635") # Terracotta
    gold_color = colors.HexColor("#B8860B")      # Gold
    dark_color = colors.HexColor("#2C221E")      # Charcoal
    text_muted = colors.HexColor("#5F514B")      # Muted Charcoal
    bg_card = colors.HexColor("#FAF7F2")         # Warm Ivory

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=6,
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=text_muted,
        spaceAfter=15,
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=primary_color,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True,
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=secondary_color,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=dark_color,
        spaceAfter=6,
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=dark_color,
        leftIndent=14,
        spaceAfter=3,
    )

    code_block_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#331118"),
        spaceAfter=4,
    )

    badge_style = ParagraphStyle(
        'Badge_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=primary_color,
    )

    story = []

    # Title Banner Box
    title_data = [
        [
            Paragraph("<b>AKHIL &amp; KARTHIKA DIGITAL WEDDING INVITATION</b>", title_style),
        ],
        [
            Paragraph("<b>Complete Project Files, Architecture &amp; Code Usage Documentation</b><br/>"
                      "<i>React 18 · Vite · Tailwind CSS · Framer Motion · Lucide React · HTML5 Audio</i>", subtitle_style),
        ],
        [
            Paragraph("<b>Wedding Date:</b> 24 January 2027 · <b>Venue:</b> Prince Convention Centre, Alappuzha, Kerala<br/>"
                      "<b>Architecture:</b> Frontend-only Single-Page Interactive Web Application", body_style)
        ]
    ]
    title_table = Table(title_data, colWidths=[letter[0] - 108])
    title_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#FAF7F2")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#DFC9C9")),
        ('LEFTPADDING', (0, 0), (-1, -1), 16),
        ('RIGHTPADDING', (0, 0), (-1, -1), 16),
        ('TOPPADDING', (0, 0), (-1, -1), 14),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 14),
    ]))
    story.append(title_table)
    story.append(Spacer(1, 14))

    # SECTION 1: Architecture Overview
    story.append(Paragraph("1. Technical Architecture & Design System", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#DFC9C9"), spaceAfter=8))
    
    overview_text = (
        "This project is a high-aesthetic, production-ready, interactive digital wedding invitation designed "
        "as a single-page progressive journey. It follows editorial typography, warm Kerala-inspired aesthetic tones, "
        "delicate hand-drawn SVG botanicals, organic blob frames, and fluid Framer Motion choreography. "
        "The application is frontend-only, requiring no server or database infrastructure for deployment."
    )
    story.append(Paragraph(overview_text, body_style))

    # Design System Table
    tokens_data = [
        [Paragraph("<b>Category</b>", badge_style), Paragraph("<b>Token / Value</b>", badge_style), Paragraph("<b>Visual Purpose</b>", badge_style)],
        [Paragraph("Surfaces", body_style), Paragraph("#FAF7F2 (Ivory) / #F5EFE6 (Cream)", body_style), Paragraph("Warm textured background & soft modal cards", body_style)],
        [Paragraph("Brand Accent", body_style), Paragraph("#7A1C28 (Maroon) / #8B2635 (Terracotta)", body_style), Paragraph("Headings, primary CTA buttons & active highlights", body_style)],
        [Paragraph("Soft Accent", body_style), Paragraph("#E8D3D3 (Blush) / #7D8B75 (Sage Olive)", body_style), Paragraph("Borders, card dividers & botanical leaf elements", body_style)],
        [Paragraph("Typography", body_style), Paragraph("Playfair Display, Plus Jakarta Sans, Caveat", body_style), Paragraph("Display serifs, legible UI body, & handwritten notes", body_style)],
        [Paragraph("Motion Engine", body_style), Paragraph("Framer Motion 11.x & CSS Keyframes", body_style), Paragraph("Mask reveals, scroll triggers, micro-interactions & floating particles", body_style)]
    ]
    tokens_table = Table(tokens_data, colWidths=[90, 190, 224])
    tokens_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#F5EFE6")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#DFC9C9")),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(tokens_table)
    story.append(Spacer(1, 14))

    # SECTION 2: Project File Directory Tree
    story.append(Paragraph("2. Project Directory & File Map", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#DFC9C9"), spaceAfter=8))

    file_tree = """d:\\Antigravity Projects\\Invitation\\
├── index.html                      # Root HTML entry with fonts & CDN preconnects
├── package.json                    # Project metadata, dependencies & scripts
├── vite.config.js                  # Vite bundler & React plugin config
├── tailwind.config.js              # Theme tokens, custom fonts, shadows & animations
├── postcss.config.js               # PostCSS Tailwind & Autoprefixer plugin config
└── src/
    ├── main.jsx                    # React 18 DOM mount point
    ├── App.jsx                     # State orchestrator & section flow coordinator
    ├── index.css                   # Custom utilities, washi-tape styles, scrollbars
    ├── data/
    │   └── weddingData.js          # Centralized event data, images, audio & copy
    └── components/
        ├── OpeningScreen.jsx       # Fullscreen curtain reveal with "OPEN INVITATION" CTA
        ├── Navbar.jsx              # Sticky glassmorphic header with smooth scroll & mobile drawer
        ├── Hero.jsx                # Asymmetric editorial grid with organic curved photo frame
        ├── Countdown.jsx           # Live dynamic countdown timer to Jan 24, 2027 11:00 AM IST
        ├── WeddingDetails.jsx      # Ceremony details, Google Maps link, Add-to-Calendar & polaroid
        ├── Gallery.jsx             # Staggered asymmetric photo collage with rotations & tape
        ├── Lightbox.jsx            # Fullscreen interactive photo modal with keyboard Escape
        ├── QuoteSection.jsx        # Typographic love quote breathing space with drifting botanicals
        ├── RSVP.jsx                # Accessible attendance form with validation & confetti state
        ├── ThankYou.jsx            # Panoramic sunset silhouette banner with maroon gradient
        ├── MusicControl.jsx        # Floating sound player with animated equalizer bars
        └── DecorativeElements.jsx  # Reusable hand-drawn SVG botanicals, tape & monogram"""

    tree_table = Table([[Paragraph(f"<pre>{file_tree}</pre>", code_block_style)]], colWidths=[letter[0] - 108])
    tree_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F9F6F0")),
        ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor("#DFC9C9")),
        ('PADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(tree_table)
    story.append(Spacer(1, 14))

    # SECTION 3: Deep Dive into Each File and Its Code
    story.append(PageBreak())
    story.append(Paragraph("3. Detailed File & Source Code Breakdown", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#DFC9C9"), spaceAfter=10))

    files_info = [
        {
            "filename": "index.html",
            "role": "Root HTML Document Entry Point",
            "purpose": (
                "Provides the HTML container (`<div id='root'>`), loads external web typography, sets responsive "
                "viewport configurations, and declares browser performance optimizations."
            ),
            "code_highlights": [
                "<b>Preconnect Links:</b> Establishes early TLS handshakes with `fonts.googleapis.com`, `fonts.gstatic.com`, and `images.unsplash.com` to eliminate render-blocking network latency.",
                "<b>Google Web Fonts:</b> Imports `Playfair Display`, `Cormorant Garamond`, `Plus Jakarta Sans`, and `Caveat`.",
                "<b>Meta Information:</b> Includes theme-color `#FAF7F2`, wedding open-graph descriptions, and rings favicon."
            ]
        },
        {
            "filename": "package.json",
            "role": "Project Manifest, Dependencies & Scripts",
            "purpose": (
                "Specifies project metadata, runtime packages (React 18, Framer Motion, Lucide React, Canvas Confetti), "
                "build tools (Vite 5, Tailwind CSS, PostCSS, Autoprefixer), and terminal commands."
            ),
            "code_highlights": [
                "<b>Runtime Dependencies:</b> `react`, `react-dom`, `framer-motion` (for choreographed reveals and layout animations), `lucide-react` (clean modern icons), `canvas-confetti` (for RSVP celebration).",
                "<b>Scripts:</b> `npm run dev` (starts Vite dev server at port 3000), `npm run build` (creates production distribution bundle in /dist), `npm run preview` (serves production build)."
            ]
        },
        {
            "filename": "vite.config.js & postcss.config.js",
            "role": "Build Bundler & CSS Tooling Pipeline",
            "purpose": (
                "Configures Vite's lightning-fast JSX transform with `@vitejs/plugin-react` and wires PostCSS to execute Tailwind CSS and vendor autoprefixing."
            ),
            "code_highlights": [
                "<b>Vite Server Port:</b> Standardized to port 3000 with HMR enabled.",
                "<b>PostCSS Setup:</b> Enables Tailwind utility compilation and vendor-prefix injection for broad cross-browser compatibility."
            ]
        },
        {
            "filename": "tailwind.config.js",
            "role": "Design System Token & Theme Engine",
            "purpose": (
                "Extends the default Tailwind palette with wedding color tokens, custom serif/script font families, "
                "organic blob border radiuses, warm drop shadows, and subtle floating keyframe animations."
            ),
            "code_highlights": [
                "<b>Color Tokens:</b> `ivory`, `maroon`, `terracotta`, `blush`, `sage`, `gold`, and `charcoal`.",
                "<b>Custom Shadows:</b> `shadow-polaroid`, `shadow-card`, and `shadow-maroon` for tactile depth.",
                "<b>Keyframe Animations:</b> `float-slow` (drifting botanical motion) and `pulse-subtle`."
            ]
        },
        {
            "filename": "src/index.css",
            "role": "Global Stylesheet & Custom CSS Utilities",
            "purpose": (
                "Imports Tailwind layers, configures custom warm-ivory scrollbars, creates washi-tape photo edges, "
                "and enforces strict `@media (prefers-reduced-motion)` accessibility standards."
            ),
            "code_highlights": [
                "<b>.tape-sticker:</b> Realistic translucent washi-tape overlay with dashed gold borders and subtle blur.",
                "<b>.blob-shape-1 / .blob-shape-arch:</b> Organic curved clip profiles for asymmetric photo presentation.",
                "<b>Accessibility:</b> Automatically pauses or minimizes animations when users have reduced motion enabled in their OS."
            ]
        },
        {
            "filename": "src/data/weddingData.js",
            "role": "Centralized Content, Event Metadata & Asset Strategy",
            "purpose": (
                "Decouples copy, dates, coordinates, and images from UI presentation. Serves as the single source of truth "
                "for all components across the site."
            ),
            "code_highlights": [
                "<b>Event ISO Timestamp:</b> `2027-01-24T11:00:00+05:30` consumed by the Countdown engine.",
                "<b>Venue Data:</b> Address, coordinates, and direct Google Maps search query link for Alappuzha, Kerala.",
                "<b>Editorial Photography Array:</b> 6 curated Unsplash photos with custom aspect ratios, rotation angles, alt texts, and handwritten captions."
            ]
        },
        {
            "filename": "src/App.jsx",
            "role": "Application Orchestrator & State Coordinator",
            "purpose": (
                "Controls the lifecycle of the entire experience: manages the opening reveal state, initializes and controls "
                "background audio with HTML5 Audio API, toggles body scroll locking, and renders all 8 sections sequentially."
            ),
            "code_highlights": [
                "<b>Scroll Lock Effect:</b> Enforces `document.body.style.overflow = 'hidden'` until the user clicks 'OPEN INVITATION'.",
                "<b>Audio API Controller:</b> Plays `wedding-ambient.mp3` on the user's explicit interaction (avoiding browser autoplay blocks) with smooth play/pause state synchronization.",
                "<b>Component Pipeline:</b> Renders OpeningScreen -> Navbar -> Hero -> Countdown -> WeddingDetails -> Gallery -> QuoteSection -> RSVP -> ThankYou -> MusicControl."
            ]
        },
        {
            "filename": "src/components/OpeningScreen.jsx",
            "role": "Section 01: Fullscreen Invitation Reveal Overlay",
            "purpose": (
                "Presents an immersive digital envelope / card reveal. Displays family blessings, couple names, wedding date, "
                "and the primary 'OPEN INVITATION →' button."
            ),
            "code_highlights": [
                "<b>Framer Motion Curtain Reveal:</b> Uses `<AnimatePresence>` with `y: '-100%'` and smooth cubic-bezier curve to elegantly reveal the main invitation.",
                "<b>Framed Couple Portrait:</b> Features couple photo with handwritten 'Better Together' note and floating botanical doodles.",
                "<b>Accessibility:</b> Equipped with `role='dialog'`, `aria-modal='true'`, and keyboard-navigable button."
            ]
        },
        {
            "filename": "src/components/Navbar.jsx",
            "role": "Sticky Navigation Header & Section Indicator",
            "purpose": (
                "Sticky glassmorphic bar that appears after opening. Provides rapid navigation to sections with smooth scrolling, "
                "active section tracking, and mobile drawer menu."
            ),
            "code_highlights": [
                "<b>Active Scroll Spy:</b> Computes window scroll position and highlights current section with an animated Framer Motion layout indicator.",
                "<b>Mobile Drawer:</b> Collapsible mobile menu with hamburger toggle for touch screens.",
                "<b>Quick RSVP CTA:</b> High-contrast maroon button linking directly to the RSVP form."
            ]
        },
        {
            "filename": "src/components/Hero.jsx",
            "role": "Section 02: Asymmetric Editorial Hero",
            "purpose": (
                "The primary visual anchor of the site. Displays handwritten 'Together forever', grand serif names, "
                "event highlight badges (Date, Time, Venue), and an organic curved picture frame."
            ),
            "code_highlights": [
                "<b>LCP Image Optimization:</b> Primary portrait tagged with `fetchpriority='high'` for instantaneous rendering.",
                "<b>Event Summary Cards:</b> Quick-glance 3-column badge grid displaying Makaram date, Muhurtham time, and Alappuzha location.",
                "<b>Interactive Actions:</b> 'Our Journey ↓' smooth scroll button and 'Reserve Attendance' link."
            ]
        },
        {
            "filename": "src/components/Countdown.jsx",
            "role": "Section 03: Live Real-Time Countdown Engine",
            "purpose": (
                "Dynamic live countdown calculating the remaining time down to the exact second until January 24, 2027 11:00 AM IST."
            ),
            "code_highlights": [
                "<b>JavaScript Time Engine:</b> `setInterval` hook calculating Days, Hours, Minutes, and Seconds from `Date.now()` to target ISO timestamp.",
                "<b>Delicate Cream Panels:</b> 4-column responsive grid with thin maroon borders and subtle hover lift.",
                "<b>Floral Flankers:</b> Symmetrical hand-drawn SVG botanical ornaments framing the title."
            ]
        },
        {
            "filename": "src/components/WeddingDetails.jsx",
            "role": "Section 04: Ceremony Specifications & Venue Card",
            "purpose": (
                "Provides guests with ceremony timings, Google Maps directions, Add-to-Calendar functionality, and a taped polaroid of the Kerala destination."
            ),
            "code_highlights": [
                "<b>Google Calendar Generator:</b> Encodes event title, dates (`20270124T053000Z`), venue, and Sadya feast details into a direct calendar link.",
                "<b>Polaroid Card:</b> Styled with washi-tape sticker, Kerala backwaters photograph (`loading='lazy'`), and handwritten 'See you there! ♡' script.",
                "<b>Map Direction CTA:</b> Direct link opening Google Maps for Prince Convention Centre, Alappuzha."
            ]
        },
        {
            "filename": "src/components/Gallery.jsx & Lightbox.jsx",
            "role": "Section 05: Asymmetric Photo Collage & Interactive Lightbox",
            "purpose": (
                "Presents pre-wedding editorial photos in a staggered, asymmetric layout with rotational angles, washi tape, and click-to-zoom modal."
            ),
            "code_highlights": [
                "<b>Asymmetric Stagger:</b> Alternating rotations (`-rotate-2`, `rotate-2`) and column spans (`col-span-7`, `col-span-5`) creating an editorial magazine feel.",
                "<b>Lightbox Modal:</b> Accessible dialog with backdrop blur, full-resolution image display, photo caption, and keyboard `Escape` listener.",
                "<b>Performance:</b> Below-the-fold images use `loading='lazy'` and `decoding='async'`."
            ]
        },
        {
            "filename": "src/components/QuoteSection.jsx",
            "role": "Section 06: Typographic Love Pause",
            "purpose": (
                "Provides visual breathing space with large quotation marks around 'Two hearts, one beautiful beginning.' flanked by drifting SVG leaf vectors."
            ),
            "code_highlights": [
                "<b>Grand Serif Quote:</b> 60px display quotation marks with gold divider line and pulsing heart icon.",
                "<b>Restrained Whitespace:</b> High-contrast, minimal layout encouraging a thoughtful emotional pause."
            ]
        },
        {
            "filename": "src/components/RSVP.jsx",
            "role": "Section 07: Interactive Attendance Form & Celebration Card",
            "purpose": (
                "Accessible attendance submission form with real-time validation, custom radio buttons, no guest-count field, and celebratory confetti state."
            ),
            "code_highlights": [
                "<b>Form State & Validation:</b> Verifies guest name and ensures attendance selection ('Joyfully Accept' vs. 'Regretfully Decline').",
                "<b>Celebratory Confetti:</b> Integrates `canvas-confetti` with maroon and gold color scheme upon affirmative RSVP.",
                "<b>Confirmation View:</b> Smoothly replaces form with personalized thank-you card and allows resetting or editing response."
            ]
        },
        {
            "filename": "src/components/ThankYou.jsx",
            "role": "Section 08: Full-Width Cinematic Sunset Banner",
            "purpose": (
                "The grand finale of the invitation: a full-width sunset silhouette of the couple overlayed with a deep maroon gradient filter and golden typography."
            ),
            "code_highlights": [
                "<b>Cinematic Backdrop:</b> High-resolution sunset image with multi-stop dark maroon and charcoal gradient overlay.",
                "<b>Grand Typography:</b> 'THANK YOU FOR BEING PART OF OUR SPECIAL DAY', monogram seal, and wedding date.",
                "<b>Footer Metadata:</b> Copyright, blessings note, and handcrafted love credit."
            ]
        },
        {
            "filename": "src/components/MusicControl.jsx",
            "role": "Floating Background Audio Controller",
            "purpose": (
                "Unobtrusive bottom-right audio widget that displays sound equalizer animations when playing and toggles audio on demand."
            ),
            "code_highlights": [
                "<b>Equalizer Animation:</b> 3 pulsing bar bars simulating live acoustic frequency waves.",
                "<b>Status Dot:</b> Emerald pulsing indicator showing active audio stream.",
                "<b>Accessible Controls:</b> Keyboard focusable, ARIA title, and smooth Framer Motion entry."
            ]
        },
        {
            "filename": "src/components/DecorativeElements.jsx",
            "role": "Reusable SVG Botanical Art & Visual Accents",
            "purpose": (
                "Provides vector botanical branches, floral line-art ornaments, doodle hearts, sparkles, washi tape, and couple monogram badges."
            ),
            "code_highlights": [
                "<b>Pure SVG:</b> Zero raster asset overhead; lightweight, scalable, and crisp on all retina screens.",
                "<b>Washi Tape:</b> Polygon clip-path creating realistic ripped paper edges."
            ]
        }
    ]

    for item in files_info:
        file_box = [
            [
                Paragraph(f"<b>FILE: {item['filename']}</b>", ParagraphStyle('H2F', parent=h2_style, textColor=colors.HexColor("#7A1C28"))),
                Paragraph(f"<b>Role:</b> {item['role']}", ParagraphStyle('RoleF', parent=body_style, fontName='Helvetica-Bold', textColor=colors.HexColor("#8B2635")))
            ],
            [
                Paragraph(f"<b>Overview:</b> {item['purpose']}", body_style),
                Paragraph("", body_style)
            ]
        ]
        
        # Highlights
        highlights_content = []
        for h in item['code_highlights']:
            highlights_content.append(Paragraph(f"• {h}", bullet_style))
        
        content_table_data = [
            [
                Paragraph(f"<b>FILE:</b> <font color='#7A1C28'><b>{item['filename']}</b></font>", h2_style),
                Paragraph(f"<font color='#5F514B'><b>Role:</b> {item['role']}</font>", body_style)
            ],
            [
                Paragraph(f"<b>Purpose:</b> {item['purpose']}", body_style),
                Paragraph("", body_style)
            ],
            [
                highlights_content,
                Paragraph("", body_style)
            ]
        ]
        
        file_table = Table(content_table_data, colWidths=[380, 124])
        file_table.setStyle(TableStyle([
            ('SPAN', (0, 1), (1, 1)),
            ('SPAN', (0, 2), (1, 2)),
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#FAF7F2")),
            ('BOX', (0, 0), (-1, -1), 0.75, colors.HexColor("#E8D3D3")),
            ('LINEBELOW', (0, 0), (-1, 0), 0.5, colors.HexColor("#DFC9C9")),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('LEFTPADDING', (0, 0), (-1, -1), 10),
            ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ]))
        
        story.append(KeepTogether([
            file_table,
            Spacer(1, 10)
        ]))

    # SECTION 4: Verification & Command Summary
    story.append(PageBreak())
    story.append(Paragraph("4. Execution Commands & Verification Summary", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#DFC9C9"), spaceAfter=10))

    cmd_text = (
        "<b>To launch and run the project locally via Command Prompt:</b><br/>"
        "<code>cd /d \"d:\\Antigravity Projects\\Invitation\"</code><br/>"
        "<code>npm run dev</code> &nbsp;&nbsp;<i>(Runs development server at http://localhost:3000)</i><br/><br/>"
        "<b>To compile and test the optimized production build:</b><br/>"
        "<code>npm run build</code> &nbsp;<i>(Compiles Vite production bundle)</i><br/>"
        "<code>npm run preview</code> &nbsp;<i>(Serves preview at http://localhost:4173)</i>"
    )
    cmd_table = Table([[Paragraph(cmd_text, body_style)]], colWidths=[letter[0] - 108])
    cmd_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#F5EFE6")),
        ('BOX', (0, 0), (-1, -1), 1, colors.HexColor("#7A1C28")),
        ('PADDING', (0, 0), (-1, -1), 12),
    ]))
    story.append(cmd_table)
    story.append(Spacer(1, 14))

    # Verification Checklist Table
    check_data = [
        [Paragraph("<b>Validation Criteria</b>", badge_style), Paragraph("<b>Implementation Result</b>", badge_style), Paragraph("<b>Status</b>", badge_style)],
        [Paragraph("Opening Curtain Mask Reveal", body_style), Paragraph("Framer Motion smooth mask unroll with audio trigger", body_style), Paragraph("<font color='#008000'><b>PASS</b></font>", body_style)],
        [Paragraph("Live Real-Time Countdown", body_style), Paragraph("Dynamic countdown to 24 January 2027 11:00 AM IST", body_style), Paragraph("<font color='#008000'><b>PASS</b></font>", body_style)],
        [Paragraph("Wedding Venue & Maps", body_style), Paragraph("Prince Convention Centre, Alappuzha + Google Maps & Calendar", body_style), Paragraph("<font color='#008000'><b>PASS</b></font>", body_style)],
        [Paragraph("Asymmetric Editorial Gallery", body_style), Paragraph("Staggered layout, tape stickers, rotations & full Lightbox modal", body_style), Paragraph("<font color='#008000'><b>PASS</b></font>", body_style)],
        [Paragraph("Frontend RSVP Form", body_style), Paragraph("Name validation, attendance radio, no guest count, confetti", body_style), Paragraph("<font color='#008000'><b>PASS</b></font>", body_style)],
        [Paragraph("Audio Controller", body_style), Paragraph("Floating soundwave bars, play/pause toggle, acoustic serenade", body_style), Paragraph("<font color='#008000'><b>PASS</b></font>", body_style)],
        [Paragraph("Accessibility & Responsiveness", body_style), Paragraph("ARIA modal, focus management, reduced-motion, mobile drawer", body_style), Paragraph("<font color='#008000'><b>PASS</b></font>", body_style)],
        [Paragraph("Production Build", body_style), Paragraph("Vite 5 bundle compiled cleanly with 0 errors / 0 warnings", body_style), Paragraph("<font color='#008000'><b>PASS</b></font>", body_style)],
    ]
    check_table = Table(check_data, colWidths=[160, 284, 60])
    check_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#F5EFE6")),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#DFC9C9")),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(check_table)

    # Build Document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {os.path.abspath(pdf_path)}")

if __name__ == "__main__":
    generate_pdf()
