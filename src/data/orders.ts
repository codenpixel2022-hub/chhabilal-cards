export interface OrderStatusStep {
  title: string;
  description: string;
  date?: string;
  completed: boolean;
  current?: boolean;
}

export interface TrackedOrder {
  orderId: string;
  customerName: string;
  productName: string;
  productCode: string;
  quantity: number;
  orderDate: string;
  expectedDelivery: string;
  currentStage: 'proof_design' | 'screen_foil_making' | 'printing_press' | 'finishing_binding' | 'dispatched' | 'delivered';
  courierPartner?: string;
  trackingNumber?: string;
  destinationCity: string;
  steps: OrderStatusStep[];
  notes?: string;
}

export const SAMPLE_TRACKING_ORDERS: Record<string, TrackedOrder> = {
  'CC-8821': {
    orderId: 'CC-8821',
    customerName: 'Priyanka & Rahul Mishra',
    productName: 'Royal Velvet Farman Scroll Wedding Invitation',
    productCode: 'WC-01',
    quantity: 250,
    orderDate: '24 Aug 2026',
    expectedDelivery: '30 Aug 2026',
    currentStage: 'dispatched',
    courierPartner: 'DTDC Express Courier',
    trackingNumber: 'DTDC-OD-8921820',
    destinationCity: 'Sambalpur, Odisha',
    notes: 'Multilingual Odia + English insert with gold tassel scrolls.',
    steps: [
      {
        title: 'Order & Draft Received',
        description: 'Manuscript text & deity symbol proof confirmed via WhatsApp.',
        date: '24 Aug, 11:30 AM',
        completed: true
      },
      {
        title: 'Screen & Foil Die Preparation',
        description: 'Custom hot gold foil brass die and Ganesh seal produced.',
        date: '25 Aug, 03:15 PM',
        completed: true
      },
      {
        title: 'Heidelberg Offset & Stamping',
        description: 'Velvet casing printed and 24K luster gold foil embossed.',
        date: '26 Aug, 06:45 PM',
        completed: true
      },
      {
        title: 'Box Binding & Quality Check',
        description: 'Scroll wooden rods assembled and envelope seals inspected.',
        date: '27 Aug, 02:00 PM',
        completed: true
      },
      {
        title: 'Dispatched via Courier',
        description: 'Handed over to DTDC Brajarajnagar hub. In transit to Sambalpur.',
        date: '28 Aug, 09:15 AM',
        completed: true,
        current: true
      },
      {
        title: 'Delivered',
        description: 'Expected arrival at doorstep.',
        date: '30 Aug 2026',
        completed: false
      }
    ]
  },
  'CC-9042': {
    orderId: 'CC-9042',
    customerName: 'Adv. S. K. Patel & Associates',
    productName: 'Custom Heavy Bond Legal Advocate Files',
    productCode: 'ST-01',
    quantity: 500,
    orderDate: '26 Aug 2026',
    expectedDelivery: '01 Sep 2026',
    currentStage: 'printing_press',
    destinationCity: 'Jharsuguda District Court',
    notes: 'Calico cloth spine with advocate chamber embossing.',
    steps: [
      {
        title: 'Order & Artwork Finalized',
        description: 'Legal chamber typography and logo verified.',
        date: '26 Aug, 02:00 PM',
        completed: true
      },
      {
        title: 'Board Cutting & Die Setup',
        description: '450 GSM rigid duplex board sizing and crease scoring.',
        date: '27 Aug, 11:00 AM',
        completed: true
      },
      {
        title: 'Press Printing & Hot Stamping',
        description: 'Screen printed chamber text and moisture-resistant lamination.',
        date: '28 Aug, In Progress',
        completed: false,
        current: true
      },
      {
        title: 'Spine Binding & Eyelet Assembly',
        description: 'Reinforced calico binding and brass metal corner eyelets.',
        date: '29 Aug 2026',
        completed: false
      },
      {
        title: 'Ready for Workshop Pickup / Local Dispatch',
        description: 'Packaging in moisture-proof bundles.',
        date: '01 Sep 2026',
        completed: false
      }
    ]
  },
  'CC-7910': {
    orderId: 'CC-7910',
    customerName: 'Mohapatra Family',
    productName: '3D Pop-Up Laser Mandap Wedding Box',
    productCode: 'WC-02',
    quantity: 150,
    orderDate: '20 Aug 2026',
    expectedDelivery: '27 Aug 2026',
    currentStage: 'delivered',
    courierPartner: 'Local Express Delivery',
    trackingNumber: 'DEL-BJR-7719',
    destinationCity: 'Brajarajnagar, Jharsuguda',
    notes: 'Delivered directly to Rajpur residence.',
    steps: [
      {
        title: 'Order Confirmed',
        description: 'Shubh Vivah Odia wording finalized.',
        date: '20 Aug',
        completed: true
      },
      {
        title: 'Laser Cutting & Pressing',
        description: 'Laser cut mandap arches cut on 350 GSM metallic cardstock.',
        date: '22 Aug',
        completed: true
      },
      {
        title: 'Hand Assembly & Packaging',
        description: 'Pop-up fold mechanics tested and sealed in protective film.',
        date: '24 Aug',
        completed: true
      },
      {
        title: 'Delivered',
        description: 'Handed over to customer with GST tax invoice.',
        date: '27 Aug',
        completed: true,
        current: true
      }
    ]
  }
};
