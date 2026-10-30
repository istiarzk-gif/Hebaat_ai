import React, { useState, useEffect, useMemo } from 'react';
import { 
  Heart, Shield, Users, BookOpen, Calendar, BarChart2, MessageSquare, 
  Bell, Settings, Plus, Edit, Trash2, CheckCircle2, AlertCircle, XCircle, 
  Search, Filter, Download, Printer, UserCheck, School, Lock, LogOut, 
  ChevronRight, Sparkles, Check, Clock, Eye, ArrowLeft, RefreshCw, 
  HelpCircle, Info, Menu, X, Baby, Award, CheckSquare, Compass, FileText,
  Sunrise, Sun, Activity, Utensils, BookMarked, Globe, Moon, Database
} from 'lucide-react';

// --- INITIAL DEMO DATA & CONSTANTS ---
const APP_CREDIT = "Created with ♥ Istianah | TK Pertiwi Ds Ketanggungan";

const HABIT_CATEGORIES = [
  { id: 'bangun_pagi', name: 'BANGUN PAGI', icon: Sunrise, desc: 'Dokumentasi kebiasaan bangun pagi, kesiapan memulai hari, dan rutinitas pagi.' },
  { id: 'beribadah', name: 'BERIBADAH', icon: Sun, desc: 'Dokumentasi pembiasaan beribadah sesuai agama dan kepercayaan keluarga.' },
  { id: 'berolahraga', name: 'BEROLAHRAGA', icon: Activity, desc: 'Dokumentasi aktivitas fisik, gerak tubuh, permainan aktif, dan olahraga.' },
  { id: 'makan_sehat', name: 'MAKAN SEHAT DAN BERGIZI', icon: Utensils, desc: 'Dokumentasi konsumsi makanan bergizi, buah, sayur, dan minum air putih.' },
  { id: 'gemar_belajar', name: 'GEMAR BELAJAR', icon: BookMarked, desc: 'Dokumentasi membaca, eksplorasi, bertanya, berkarya, dan belajar melalui bermain.' },
  { id: 'bermasyarakat', name: 'BERMASYARAKAT', icon: Globe, desc: 'Dokumentasi interaksi sosial, kepedulian, kerja sama, dan berbagi.' },
  { id: 'tidur_cepat', name: 'TIDUR CEPAT', icon: Moon, desc: 'Dokumentasi rutinitas tidur, waktu istirahat, dan pembiasaan tidur teratur.' },
];

const INITIAL_INSTITUTIONS = [
  { id: 'inst-1', name: 'TK Pertiwi Ds Ketanggungan', npsn: '20193847', stage: 'TK', address: 'Jl. Raya Ketanggungan No. 12', province: 'Jawa Tengah', regency: 'Brebes', headmaster: 'Istianah, S.Pd.', phone: '081234567890', email: 'tkpertiwi@example.com', status: 'approved', createdAt: '2026-01-10' },
  { id: 'inst-2', name: 'PAUD Tunas Bangsa Maju', npsn: '20199922', stage: 'PAUD', address: 'Jl. Melati Indah No. 5', province: 'Jawa Barat', regency: 'Bandung', headmaster: 'Siti Aminah, M.Pd.', phone: '085678901234', email: 'tunasbangsa@example.com', status: 'pending', createdAt: '2026-03-01' }
];

const INITIAL_USERS = [
  { id: 'u-super', name: 'Super Admin Nasional', email: 'superadmin@hebaat.ai', role: 'super_admin', institutionId: null },
  { id: 'u-admin1', name: 'Istianah (Kepala Sekolah)', email: 'admin@tkpertiwi.sch.id', role: 'admin_lembaga', institutionId: 'inst-1' },
  { id: 'u-guru1', name: 'Bunda Rina, S.Pd.', email: 'rina@tkpertiwi.sch.id', role: 'guru', institutionId: 'inst-1', classIds: ['cls-1'] },
  { id: 'u-guru2', name: 'Bunda Dewi, S.Pd.', email: 'dewi@tkpertiwi.sch.id', role: 'guru', institutionId: 'inst-1', classIds: ['cls-2'] },
  { id: 'u-parent1', name: 'Bapak Budi (Wali Alula)', email: 'budi@example.com', role: 'orang_tua', institutionId: 'inst-1', childIds: ['ch-1'] },
  { id: 'u-parent2', name: 'Ibu Ani (Wali Gibran)', email: 'ani@example.com', role: 'orang_tua', institutionId: 'inst-1', childIds: ['ch-2'] }
];

const INITIAL_CLASSES = [
  { id: 'cls-1', name: 'Kelompok A (Melati)', institutionId: 'inst-1', academicYear: '2025/2026', teacherId: 'u-guru1' },
  { id: 'cls-2', name: 'Kelompok B (Anggrek)', institutionId: 'inst-1', academicYear: '2025/2026', teacherId: 'u-guru2' }
];

const INITIAL_CHILDREN = [
  { id: 'ch-1', name: 'Alula Zahra', gender: 'P', dob: '2021-04-12', parentName: 'Bapak Budi', parentPhone: '08111222333', address: 'Ds. Ketanggungan RT 02/01', institutionId: 'inst-1', classId: 'cls-1', status: 'active' },
  { id: 'ch-2', name: 'Gibran Al-Fatih', gender: 'L', dob: '2020-09-15', parentName: 'Ibu Ani', parentPhone: '08223344556', address: 'Ds. Ketanggungan RT 04/02', institutionId: 'inst-1', classId: 'cls-1', status: 'active' },
  { id: 'ch-3', name: 'Kirana Putri', gender: 'P', dob: '2021-01-20', parentName: 'Bapak Joko', parentPhone: '08334455667', address: 'Ds. Ketanggungan RT 01/01', institutionId: 'inst-1', classId: 'cls-2', status: 'active' },
  { id: 'ch-4', name: 'Rafa Pratama', gender: 'L', dob: '2020-11-05', parentName: 'Ibu Siska', parentPhone: '08445566778', address: 'Ds. Ketanggungan RT 03/02', institutionId: 'inst-1', classId: 'cls-2', status: 'active' },
  { id: 'ch-5', name: 'Zahira Nisa', gender: 'P', dob: '2021-06-10', parentName: 'Bapak Hendra', parentPhone: '08556677889', address: 'Ds. Ketanggungan RT 05/03', institutionId: 'inst-1', classId: 'cls-1', status: 'active' }
];

const INITIAL_JOURNALS = [
  { id: 'j-1', childId: 'ch-1', institutionId: 'inst-1', date: '2026-03-30', habitId: 'bangun_pagi', status: 'Terlaksana', note: 'Bangun jam 05.00 pagi dengan ceria dan langsung merapikan tempat tidur.', source: 'rumah', recordedBy: 'Bapak Budi (Orang Tua)', createdAt: '2026-03-30 06:15' },
  { id: 'j-2', childId: 'ch-1', institutionId: 'inst-1', date: '2026-03-30', habitId: 'beribadah', status: 'Terlaksana', note: 'Mengikuti doa pagi bersama di sekolah dengan khusyuk.', source: 'sekolah', recordedBy: 'Bunda Rina (Guru)', createdAt: '2026-03-30 08:30' },
  { id: 'j-3', childId: 'ch-1', institutionId: 'inst-1', date: '2026-03-30', habitId: 'berolahraga', status: 'Terlaksana', note: 'Semangat senam pagi dan lari ceria di halaman sekolah.', source: 'sekolah', recordedBy: 'Bunda Rina (Guru)', createdAt: '2026-03-30 09:00' },
  { id: 'j-4', childId: 'ch-2', institutionId: 'inst-1', date: '2026-03-30', habitId: 'makan_sehat', status: 'Terlaksana', note: 'Menghabiskan bekal nasi, telur, dan sayur brokoli kesukaan.', source: 'rumah', recordedBy: 'Ibu Ani (Orang Tua)', createdAt: '2026-03-30 12:00' },
];

const INITIAL_MESSAGES = [
  { id: 'm-1', senderId: 'u-parent1', recipientId: 'u-guru1', childId: 'ch-1', text: 'Bunda Rina, terima kasih catatan hari ini untuk Alula ya.', time: '2026-03-30 10:05', read: false },
  { id: 'm-2', senderId: 'u-guru1', recipientId: 'u-parent1', childId: 'ch-1', text: 'Sama-sama Ayah Budi, Alula hari ini sangat aktif berpartisipasi.', time: '2026-03-30 10:20', read: true }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'n-1', userId: 'u-guru1', title: 'Jurnal Baru', message: 'Bapak Budi mengisi jurnal Bangun Pagi untuk Alula Zahra.', time: '2026-03-30 06:16', read: false },
  { id: 'n-2', userId: 'u-parent1', title: 'Catatan Guru', message: 'Bunda Rina menambahkan catatan kegiatan Berolahraga.', time: '2026-03-30 09:05', read: false }
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentRole, setCurrentRole] = useState('landing'); // landing, login, register_inst, dashboard
  const [currentUser, setCurrentUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [toast, setToast] = useState(null);

  // Local Storage Persistent State
  const [institutions, setInstitutions] = useState(() => {
    const saved = localStorage.getItem('heb_institutions');
    return saved ? JSON.parse(saved) : INITIAL_INSTITUTIONS;
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('heb_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('heb_classes');
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });
  const [childrenList, setChildrenList] = useState(() => {
    const saved = localStorage.getItem('heb_children');
    return saved ? JSON.parse(saved) : INITIAL_CHILDREN;
  });
  const [journals, setJournals] = useState(() => {
    const saved = localStorage.getItem('heb_journals');
    return saved ? JSON.parse(saved) : INITIAL_JOURNALS;
  });
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('heb_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('heb_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('heb_institutions', JSON.stringify(institutions));
    localStorage.setItem('heb_users', JSON.stringify(users));
    localStorage.setItem('heb_classes', JSON.stringify(classes));
    localStorage.setItem('heb_children', JSON.stringify(childrenList));
    localStorage.setItem('heb_journals', JSON.stringify(journals));
    localStorage.setItem('heb_messages', JSON.stringify(messages));
    localStorage.setItem('heb_notifications', JSON.stringify(notifications));
  }, [institutions, users, classes, childrenList, journals, messages, notifications]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleLogin = (email, roleOverride = null) => {
    const found = users.find(u => u.email === email || (roleOverride && u.role === roleOverride));
    if (found) {
      setCurrentUser(found);
      setCurrentRole('dashboard');
      setActiveMenu('dashboard');
      showToast(`Selamat datang, ${found.name}!`);
    } else {
      showToast('Akun tidak ditemukan. Silakan periksa email.', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('landing');
    showToast('Berhasil keluar sistem.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-white transition-all transform animate-bounce ${
          toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
        }`}>
          {toast.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {currentRole === 'landing' && (
        <LandingPage 
          onNavigateLogin={() => setCurrentRole('login')} 
          onNavigateRegister={() => setCurrentRole('register_inst')}
          onQuickDemoLogin={handleLogin}
        />
      )}

      {currentRole === 'login' && (
        <LoginPage 
          onBack={() => setCurrentRole('landing')}
          onLogin={handleLogin}
          users={users}
        />
      )}

      {currentRole === 'register_inst' && (
        <RegisterInstitutionPage 
          onBack={() => setCurrentRole('landing')}
          onRegister={(newInst) => {
            setInstitutions([...institutions, newInst]);
            showToast('Pendaftaran lembaga berhasil dikirim dan menunggu persetujuan Super Admin.');
            setCurrentRole('login');
          }}
        />
      )}

      {currentRole === 'dashboard' && currentUser && (
        <DashboardLayout 
          currentUser={currentUser}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          onLogout={handleLogout}
          institutions={institutions}
          setInstitutions={setInstitutions}
          users={users}
          setUsers={setUsers}
          classes={classes}
          setClasses={setClasses}
          childrenList={childrenList}
          setChildrenList={setChildrenList}
          journals={journals}
          setJournals={setJournals}
          messages={messages}
          setMessages={setMessages}
          notifications={notifications}
          setNotifications={setNotifications}
          showToast={showToast}
        />
      )}

      <footer className="py-4 px-6 bg-white border-t border-slate-200 text-center text-xs text-slate-500 mt-auto">
        <p>{APP_CREDIT}</p>
      </footer>
    </div>
  );
}

// ==========================================
// 1. LANDING PAGE
// ==========================================
function LandingPage({ onNavigateLogin, onNavigateRegister, onQuickDemoLogin }) {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-emerald-50 via-white to-blue-50">
      <header className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur border-b border-slate-100 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-slate-900 leading-tight">HEBAAT AI</h1>
            <p className="text-xs text-emerald-700 font-medium">Jurnal Digital 7 Kebiasaan Anak</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onNavigateLogin} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition">
            Masuk
          </button>
          <button onClick={onNavigateRegister} className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition">
            Daftarkan Lembaga
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
            <Sparkles size={14} /> Ekosistem PAUD Nasional Berbasis AI
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            "Setiap Kebiasaan Kecil, Membentuk <span className="text-emerald-600">Masa Depan Hebat.</span>"
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Platform digital kolaboratif antara Guru dan Orang Tua untuk mendokumentasikan serta memantau 7 Kebiasaan Anak Indonesia Hebat dengan pendekatan hangat dan analitik cerdas.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button onClick={onNavigateRegister} className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition flex items-center gap-2">
              Mulai Lembaga Anda <ChevronRight size={18} />
            </button>
            <button onClick={onNavigateLogin} className="px-6 py-3 bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 font-bold rounded-xl shadow-sm transition">
              Masuk Akun
            </button>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">Coba Demo Cepat Berdasarkan Peran:</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => onQuickDemoLogin('superadmin@hebaat.ai')} className="px-3 py-1.5 bg-slate-900 text-white text-xs rounded-lg font-medium hover:bg-slate-800 transition">
                Super Admin
              </button>
              <button onClick={() => onQuickDemoLogin('admin@tkpertiwi.sch.id')} className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg font-medium hover:bg-blue-700 transition">
                Admin Lembaga
              </button>
              <button onClick={() => onQuickDemoLogin('rina@tkpertiwi.sch.id')} className="px-3 py-1.5 bg-emerald-600 text-white text-xs rounded-lg font-medium hover:bg-emerald-700 transition">
                Guru
              </button>
              <button onClick={() => onQuickDemoLogin('budi@example.com')} className="px-3 py-1.5 bg-amber-600 text-white text-xs rounded-lg font-medium hover:bg-amber-700 transition">
                Orang Tua
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {HABIT_CATEGORIES.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div key={h.id} className={`p-5 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition ${idx === 6 ? 'col-span-2' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800 mb-1">{idx + 1}. {h.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 2. LOGIN PAGE
// ==========================================
function LoginPage({ onBack, onLogin, users }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-100">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 border border-slate-200">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm mb-6 font-medium">
          <ArrowLeft size={16} /> Kembali ke Beranda
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-200 mb-3">
            <Shield size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Masuk ke HEBAAT AI</h2>
          <p className="text-sm text-slate-500 mt-1">Masukkan email terdaftar atau pilih demo instan di bawah.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Pengguna</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contoh: rina@tkpertiwi.sch.id" 
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition">
            Masuk Sistem
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 mb-3 text-center uppercase">Pintasan Akun Demo:</p>
          <div className="grid grid-cols-2 gap-2">
            {users.map(u => (
              <button 
                key={u.id}
                type="button"
                onClick={() => onLogin(u.email)}
                className="p-2.5 text-left text-xs bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-xl transition"
              >
                <p className="font-bold text-slate-800 truncate">{u.name}</p>
                <p className="text-emerald-700 capitalize text-[10px]">{u.role.replace('_', ' ')}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. REGISTER INSTITUTION PAGE
// ==========================================
function RegisterInstitutionPage({ onBack, onRegister }) {
  const [form, setForm] = useState({
    name: '', npsn: '', stage: 'TK', address: '', province: 'Jawa Tengah', regency: 'Brebes',
    headmaster: '', phone: '', email: '', adminName: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newInst = {
      id: 'inst-' + Date.now(),
      ...form,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    onRegister(newInst);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-100">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-8 border border-slate-200">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-sm mb-6 font-medium">
          <ArrowLeft size={16} /> Kembali
        </button>

        <h2 className="text-2xl font-bold text-slate-900 mb-1">Pendaftaran Lembaga / Satuan PAUD</h2>
        <p className="text-sm text-slate-500 mb-6">Daftarkan satuan pendidikan Anda untuk bergabung dalam ekosistem HEBAAT AI.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lembaga</label>
              <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="TK/PAUD..." className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">NPSN (Nomor Pokok Sekolah Nasional)</label>
              <input type="text" value={form.npsn} onChange={e => setForm({...form, npsn: e.target.value})} placeholder="8 digit NPSN" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jenjang Satuan</label>
              <select value={form.stage} onChange={e => setForm({...form, stage: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                <option value="TK">Taman Kanak-Kanak (TK)</option>
                <option value="PAUD">Pendidikan Anak Usia Dini (PAUD)</option>
                <option value="RA">Raudhatul Athfal (RA)</option>
                <option value="KB">Kelompok Bermain (KB)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Kepala Sekolah / Admin</label>
              <input required type="text" value={form.headmaster} onChange={e => setForm({...form, headmaster: e.target.value, adminName: e.target.value})} placeholder="Nama Lengkap & Gelar" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nomor Telepon / WhatsApp</label>
              <input required type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="08xxxxxxxxxx" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Aktif Lembaga</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@lembaga.sch.id" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Lengkap</label>
            <textarea required rows="2" value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Jalan, Desa, Kecamatan..." className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"></textarea>
          </div>
          <div className="pt-4">
            <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition">
              Kirim Permohonan Pendaftaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 4. DASHBOARD LAYOUT & ROLE-BASED MODULES
// ==========================================
function DashboardLayout({ currentUser, activeMenu, setActiveMenu, onLogout, institutions, setInstitutions, users, setUsers, classes, setClasses, childrenList, setChildrenList, journals, setJournals, messages, setMessages, notifications, setNotifications, showToast }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getMenus = () => {
    switch(currentUser.role) {
      case 'super_admin':
        return [
          { id: 'dashboard', name: 'Dashboard Nasional', icon: BarChart2 },
          { id: 'institutions', name: 'Data Lembaga', icon: School },
          { id: 'approvals', name: 'Persetujuan Lembaga', icon: UserCheck },
          { id: 'users', name: 'Pengguna', icon: Users },
          { id: 'announcements', name: 'Pengumuman', icon: Bell },
          { id: 'audit', name: 'Audit Log', icon: Database },
          { id: 'settings', name: 'Pengaturan', icon: Settings },
        ];
      case 'admin_lembaga':
        return [
          { id: 'dashboard', name: 'Dashboard Lembaga', icon: BarChart2 },
          { id: 'children', name: 'Data Anak', icon: Baby },
          { id: 'teachers', name: 'Data Guru', icon: Users },
          { id: 'parents', name: 'Data Orang Tua', icon: Users },
          { id: 'classes', name: 'Kelas / Kelompok', icon: BookOpen },
          { id: 'journals', name: 'Jurnal Kebiasaan', icon: CheckSquare },
          { id: 'calendar', name: 'Kalender', icon: Calendar },
          { id: 'ai_analyst', name: 'AI Habit Analyst', icon: Sparkles },
          { id: 'reports', name: 'Laporan & Ekspor', icon: FileText },
          { id: 'settings', name: 'Pengaturan Lembaga', icon: Settings },
        ];
      case 'guru':
        return [
          { id: 'dashboard', name: 'Dashboard Guru', icon: BarChart2 },
          { id: 'my_classes', name: 'Kelas Saya', icon: BookOpen },
          { id: 'children', name: 'Data Anak', icon: Baby },
          { id: 'journals', name: 'Isi & Kelola Jurnal', icon: CheckSquare },
          { id: 'calendar', name: 'Kalender', icon: Calendar },
          { id: 'ai_analyst', name: 'AI Habit Analyst', icon: Sparkles },
          { id: 'reports', name: 'Laporan', icon: FileText },
          { id: 'messages', name: 'Pesan Orang Tua', icon: MessageSquare },
          { id: 'notifications', name: 'Notifikasi', icon: Bell },
        ];
      case 'orang_tua':
        return [
          { id: 'dashboard', name: 'Dashboard Orang Tua', icon: BarChart2 },
          { id: 'child_profile', name: 'Profil Anak', icon: Baby },
          { id: 'journals', name: 'Jurnal Anak', icon: CheckSquare },
          { id: 'add_journal', name: 'Isi Jurnal Rumah', icon: Plus },
          { id: 'calendar', name: 'Kalender Kebiasaan', icon: Calendar },
          { id: 'ai_analyst', name: 'Rekomendasi AI', icon: Sparkles },
          { id: 'messages', name: 'Pesan Guru', icon: MessageSquare },
          { id: 'notifications', name: 'Notifikasi', icon: Bell },
        ];
      default:
        return [];
    }
  };

  const menus = getMenus();

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      <aside className={`bg-slate-900 text-slate-300 w-64 flex flex-col transition-all duration-300 z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}`}>
        <div className="p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div className={`${!sidebarOpen && 'md:hidden'}`}>
              <h2 className="font-bold text-white text-sm">HEBAAT AI</h2>
              <p className="text-[10px] text-emerald-400 capitalize">{currentUser.role.replace('_', ' ')}</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menus.map((m) => {
            const Icon = m.icon;
            const active = activeMenu === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMenu(m.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className="shrink-0" />
                <span className={`${!sidebarOpen && 'md:hidden'}`}>{m.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className={`flex items-center gap-3 mb-3 ${!sidebarOpen && 'md:justify-center'}`}>
            <div className="w-9 h-9 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className={`overflow-hidden ${!sidebarOpen && 'md:hidden'}`}>
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-bold transition"
          >
            <LogOut size={16} />
            <span className={`${!sidebarOpen && 'md:hidden'}`}>Keluar</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-600 hover:text-slate-900">
              <Menu size={22} />
            </button>
            <h1 className="font-bold text-slate-800 text-lg capitalize">{activeMenu.replace('_', ' ')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
              Mode Demo Aktif
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {currentUser.role === 'super_admin' && (
            <SuperAdminView 
              activeMenu={activeMenu} 
              institutions={institutions} 
              setInstitutions={setInstitutions} 
              users={users} 
              setUsers={setUsers} 
              showToast={showToast} 
            />
          )}

          {currentUser.role === 'admin_lembaga' && (
            <AdminLembagaView 
              activeMenu={activeMenu}
              currentUser={currentUser}
              institutions={institutions}
              classes={classes}
              setClasses={setClasses}
              childrenList={childrenList}
              setChildrenList={setChildrenList}
              users={users}
              setUsers={setUsers}
              journals={journals}
              setJournals={setJournals}
              showToast={showToast}
            />
          )}

          {currentUser.role === 'guru' && (
            <GuruView 
              activeMenu={activeMenu}
              currentUser={currentUser}
              classes={classes}
              childrenList={childrenList}
              journals={journals}
              setJournals={setJournals}
              messages={messages}
              setMessages={setMessages}
              notifications={notifications}
              showToast={showToast}
            />
          )}

          {currentUser.role === 'orang_tua' && (
            <OrangTuaView 
              activeMenu={activeMenu}
              currentUser={currentUser}
              childrenList={childrenList}
              journals={journals}
              setJournals={setJournals}
              messages={messages}
              setMessages={setMessages}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ==========================================
// 5. ROLE MODULE IMPLEMENTATIONS
// ==========================================

function SuperAdminView({ activeMenu, institutions, setInstitutions, users, setUsers, showToast }) {
  if (activeMenu === 'dashboard' || activeMenu === 'settings') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Lembaga</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{institutions.length}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-emerald-600 uppercase">Lembaga Aktif</p>
            <h3 className="text-3xl font-extrabold text-emerald-700 mt-1">{institutions.filter(i => i.status === 'approved').length}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-amber-600 uppercase">Menunggu Persetujuan</p>
            <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{institutions.filter(i => i.status === 'pending').length}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-blue-600 uppercase">Total Pengguna</p>
            <h3 className="text-3xl font-extrabold text-blue-600 mt-1">{users.length}</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-lg text-slate-800 mb-4">Statistik Penggunaan Nasional</h3>
          <p className="text-sm text-slate-500">Sistem berjalan normal dengan penyimpanan lokal persisten. Seluruh 7 Kebiasaan aktif dipantau secara nasional.</p>
        </div>
      </div>
    );
  }

  if (activeMenu === 'institutions' || activeMenu === 'approvals') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Kelola & Persetujuan Lembaga PAUD</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
              <tr>
                <th className="p-3">Nama Lembaga</th>
                <th className="p-3">NPSN</th>
                <th className="p-3">Kepala Sekolah</th>
                <th className="p-3">Wilayah</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {institutions.map(inst => (
                <tr key={inst.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{inst.name}</td>
                  <td className="p-3">{inst.npsn || '-'}</td>
                  <td className="p-3">{inst.headmaster}</td>
                  <td className="p-3">{inst.regency}, {inst.province}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      inst.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inst.status === 'approved' ? 'Disetujui' : 'Menunggu Persetujuan'}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    {inst.status === 'pending' && (
                      <button 
                        onClick={() => {
                          setInstitutions(institutions.map(i => i.id === inst.id ? {...i, status: 'approved'} : i));
                          showToast(`Lembaga ${inst.name} berhasil disetujui!`);
                        }}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                      >
                        Setujui
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setInstitutions(institutions.filter(i => i.id !== inst.id));
                        showToast(`Lembaga ${inst.name} dihapus.`);
                      }}
                      className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeMenu === 'users') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Kelola Pengguna Nasional</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
              <tr>
                <th className="p-3">Nama Pengguna</th>
                <th className="p-3">Email</th>
                <th className="p-3">Peran (Role)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 uppercase text-xs font-bold text-emerald-700">{u.role.replace('_', ' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return <div className="p-6 bg-white rounded-2xl shadow-sm border"><p className="text-slate-600">Modul Super Admin aktif dan siap digunakan.</p></div>;
}

function AdminLembagaView({ activeMenu, currentUser, institutions, classes, setClasses, childrenList, setChildrenList, users, setUsers, journals, setJournals, showToast }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newChild, setNewChild] = useState({ name: '', gender: 'L', dob: '', parentName: '', parentPhone: '', address: '', classId: classes[0]?.id || '' });

  const currentInst = institutions.find(i => i.id === currentUser.institutionId);
  const instChildren = childrenList.filter(c => c.institutionId === currentUser.institutionId);
  const instTeachers = users.filter(u => u.institutionId === currentUser.institutionId && u.role === 'guru');

  const handleAddChild = (e) => {
    e.preventDefault();
    const item = {
      id: 'ch-' + Date.now(),
      institutionId: currentUser.institutionId,
      status: 'active',
      ...newChild
    };
    setChildrenList([...childrenList, item]);
    setModalOpen(false);
    setNewChild({ name: '', gender: 'L', dob: '', parentName: '', parentPhone: '', address: '', classId: classes[0]?.id || '' });
    showToast('Data anak berhasil ditambahkan!');
  };

  if (activeMenu === 'dashboard') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{currentInst?.name || 'Lembaga PAUD'}</h2>
            <p className="text-emerald-100 text-sm mt-1">Kepala Sekolah / Admin: {currentInst?.headmaster}</p>
          </div>
          <div className="hidden md:block bg-white/10 backdrop-blur px-4 py-2 rounded-2xl border border-white/20">
            <p className="text-xs text-emerald-100">NPSN</p>
            <p className="font-bold">{currentInst?.npsn || '-'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Anak</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-1">{instChildren.length}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-emerald-600 uppercase">Kelas Aktif</p>
            <h3 className="text-3xl font-extrabold text-emerald-700 mt-1">{classes.length}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-blue-600 uppercase">Jurnal Lembaga</p>
            <h3 className="text-3xl font-extrabold text-blue-600 mt-1">{journals.filter(j => j.institutionId === currentUser.institutionId).length}</h3>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-xs font-bold text-amber-600 uppercase">Guru Terdaftar</p>
            <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{instTeachers.length}</h3>
          </div>
        </div>
      </div>
    );
  }

  if (activeMenu === 'children') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800">Daftar Anak Didik</h3>
          <button onClick={() => setModalOpen(true)} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow flex items-center gap-2">
            <Plus size={16} /> Tambah Anak
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
              <tr>
                <th className="p-3">Nama Anak</th>
                <th className="p-3">L/P</th>
                <th className="p-3">Tanggal Lahir</th>
                <th className="p-3">Orang Tua / Wali</th>
                <th className="p-3">No. Kontak</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {instChildren.map(c => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{c.name}</td>
                  <td className="p-3">{c.gender}</td>
                  <td className="p-3">{c.dob}</td>
                  <td className="p-3">{c.parentName}</td>
                  <td className="p-3">{c.parentPhone}</td>
                  <td className="p-3">
                    <button 
                      onClick={() => {
                        setChildrenList(childrenList.filter(item => item.id !== c.id));
                        showToast(`Data ${c.name} dihapus.`);
                      }}
                      className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-200"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tambah Data Anak Didik</h3>
              <form onSubmit={handleAddChild} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lengkap Anak</label>
                  <input required type="text" value={newChild.name} onChange={e => setNewChild({...newChild, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jenis Kelamin</label>
                    <select value={newChild.gender} onChange={e => setNewChild({...newChild, gender: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                      <option value="L">Laki-laki (L)</option>
                      <option value="P">Perempuan (P)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tanggal Lahir</label>
                    <input required type="date" value={newChild.dob} onChange={e => setNewChild({...newChild, dob: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Orang Tua / Wali</label>
                    <input required type="text" value={newChild.parentName} onChange={e => setNewChild({...newChild, parentName: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">No. Kontak Orang Tua</label>
                    <input required type="text" value={newChild.parentPhone} onChange={e => setNewChild({...newChild, parentPhone: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat</label>
                  <textarea rows="2" value={newChild.address} onChange={e => setNewChild({...newChild, address: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold text-sm">Batal</button>
                  <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (activeMenu === 'teachers') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Daftar Guru Pengampu</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
              <tr>
                <th className="p-3">Nama Guru</th>
                <th className="p-3">Email</th>
                <th className="p-3">Peran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {instTeachers.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-800">{t.name}</td>
                  <td className="p-3">{t.email}</td>
                  <td className="p-3 text-emerald-700 font-bold uppercase text-xs">Guru Kelas PAUD</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeMenu === 'classes') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Daftar Kelas / Kelompok Belajar</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {classes.map(cls => (
            <div key={cls.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-base">{cls.name}</h4>
              <p className="text-xs text-slate-500 mt-1">Tahun Ajaran: {cls.academicYear}</p>
              <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
                <span className="text-emerald-700 font-bold">Aktif Terdaftar</span>
                <span className="text-slate-600 font-medium">Jumlah Anak: {childrenList.filter(c => c.classId === cls.id).length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeMenu === 'calendar') {
    return <CalendarModule journals={journals} childrenList={childrenList} />;
  }

  if (activeMenu === 'reports') {
    return <ReportsModule journals={journals} childrenList={childrenList} showToast={showToast} />;
  }

  if (activeMenu === 'ai_analyst') {
    return <AIAnalystModule journals={journals} childrenList={childrenList} showToast={showToast} />;
  }

  return <div className="p-6 bg-white rounded-2xl shadow-sm border"><p className="text-slate-600">Modul {activeMenu} aktif.</p></div>;
}

function GuruView({ activeMenu, currentUser, classes, childrenList, journals, setJournals, messages, setMessages, notifications, showToast }) {
  const [selectedChild, setSelectedChild] = useState(childrenList[0]?.id || '');
  const [selectedHabit, setSelectedHabit] = useState(HABIT_CATEGORIES[0].id);
  const [status, setStatus] = useState('Terlaksana');
  const [note, setNote] = useState('');

  const handleSaveJournal = (e) => {
    e.preventDefault();
    const newEntry = {
      id: 'j-' + Date.now(),
      childId: selectedChild,
      institutionId: currentUser.institutionId,
      date: new Date().toISOString().split('T')[0],
      habitId: selectedHabit,
      status,
      note,
      source: 'sekolah',
      recordedBy: currentUser.name + ' (Guru)',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setJournals([newEntry, ...journals]);
    setNote('');
    showToast('Jurnal sekolah berhasil disimpan!');
  };

  if (activeMenu === 'dashboard' || activeMenu === 'journals') {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <CheckSquare className="text-emerald-600" /> Form Pencatatan Jurnal 7 Kebiasaan (Sekolah)
          </h3>
          <form onSubmit={handleSaveJournal} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pilih Anak Didik</label>
                <select value={selectedChild} onChange={e => setSelectedChild(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                  {childrenList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Kategori Kebiasaan</label>
                <select value={selectedHabit} onChange={e => setSelectedHabit(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                  {HABIT_CATEGORIES.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status Pembiasaan</label>
                <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                  <option value="Terlaksana">Terlaksana</option>
                  <option value="Belum terlaksana">Belum terlaksana</option>
                  <option value="Tidak teramati">Tidak teramati</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catatan Pengamatan Guru</label>
              <textarea required rows="3" value={note} onChange={e => setNote(e.target.value)} placeholder="Tuliskan catatan pengamatan nyata selama di sekolah..." className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"></textarea>
            </div>
            <button type="submit" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow text-sm">
              Simpan Jurnal Sekolah
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg text-slate-800 mb-4">Riwayat Jurnal Terakhir</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                <tr>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Anak</th>
                  <th className="p-3">Kebiasaan</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Catatan</th>
                  <th className="p-3">Sumber</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {journals.slice(0, 10).map(j => {
                  const ch = childrenList.find(c => c.id === j.childId);
                  const habit = HABIT_CATEGORIES.find(h => h.id === j.habitId);
                  return (
                    <tr key={j.id} className="hover:bg-slate-50">
                      <td className="p-3">{j.date}</td>
                      <td className="p-3 font-bold text-slate-800">{ch?.name || 'Anak'}</td>
                      <td className="p-3">{habit?.name || j.habitId}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          j.status === 'Terlaksana' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {j.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{j.note}</td>
                      <td className="p-3 uppercase text-[10px] font-bold text-blue-700">{j.source}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (activeMenu === 'calendar') {
    return <CalendarModule journals={journals} childrenList={childrenList} />;
  }

  if (activeMenu === 'ai_analyst' || activeMenu === 'reports') {
    return <AIAnalystModule journals={journals} childrenList={childrenList} showToast={showToast} />;
  }

  if (activeMenu === 'messages') {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Pesan Masuk dari Orang Tua</h3>
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-emerald-700">{m.time}</p>
                <p className="text-sm text-slate-800 font-medium mt-1">{m.text}</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-bold">Terbaca</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeMenu === 'notifications') {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Pusat Notifikasi Guru</h3>
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{n.message}</p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className="p-6 bg-white rounded-2xl shadow-sm border"><p className="text-slate-600">Modul Guru aktif.</p></div>;
}

function OrangTuaView({ activeMenu, currentUser, childrenList, journals, setJournals, messages, setMessages, showToast }) {
  const myChildId = currentUser.childIds?.[0] || childrenList[0]?.id;
  const myChild = childrenList.find(c => c.id === myChildId);
  const childJournals = journals.filter(j => j.childId === myChildId);

  const [habitId, setHabitId] = useState(HABIT_CATEGORIES[0].id);
  const [status, setStatus] = useState('Terlaksana');
  const [note, setNote] = useState('');

  const handleAddHomeJournal = (e) => {
    e.preventDefault();
    const entry = {
      id: 'j-' + Date.now(),
      childId: myChildId,
      institutionId: myChild?.institutionId || 'inst-1',
      date: new Date().toISOString().split('T')[0],
      habitId,
      status,
      note,
      source: 'rumah',
      recordedBy: currentUser.name + ' (Orang Tua)',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setJournals([entry, ...journals]);
    setNote('');
    showToast('Jurnal rumah berhasil disimpan!');
  };

  if (activeMenu === 'dashboard' || activeMenu === 'journals' || activeMenu === 'child_profile') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Ananda: {myChild?.name || 'Anak Hebat'}</h2>
            <p className="text-blue-100 text-sm mt-1">Orang Tua: {myChild?.parentName} | Kelas: Kelompok A</p>
          </div>
          <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-2xl border border-white/20">
            <p className="text-xs text-blue-100">Total Jurnal Tercatat</p>
            <p className="font-extrabold text-xl">{childJournals.length}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {HABIT_CATEGORIES.map(h => {
            const Icon = h.icon;
            const latest = childJournals.find(j => j.habitId === h.id);
            return (
              <div key={h.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                    <Icon size={20} />
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 mb-1">{h.name}</h4>
                  <p className="text-xs text-slate-500 mb-3">{h.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Status Terakhir:</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold ${
                    latest?.status === 'Terlaksana' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {latest ? latest.status : 'Belum ada'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (activeMenu === 'add_journal') {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 max-w-2xl mx-auto">
        <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
          <Plus className="text-emerald-600" /> Isi Jurnal 7 Kebiasaan di Rumah
        </h3>
        <form onSubmit={handleAddHomeJournal} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pilih Kebiasaan</label>
            <select value={habitId} onChange={e => setHabitId(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
              {HABIT_CATEGORIES.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Status Pembiasaan</label>
            <select value={status} onChange={e => setStatus(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
              <option value="Terlaksana">Terlaksana</option>
              <option value="Belum terlaksana">Belum terlaksana</option>
              <option value="Tidak teramati">Tidak teramati</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catatan Aktivitas di Rumah</label>
            <textarea required rows="3" value={note} onChange={e => setNote(e.target.value)} placeholder="Ceritakan kebiasaan anak hari ini di rumah..." className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"></textarea>
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow text-sm">
            Simpan Jurnal Rumah
          </button>
        </form>
      </div>
    );
  }

  if (activeMenu === 'calendar') {
    return <CalendarModule journals={childJournals} childrenList={childrenList} />;
  }

  if (activeMenu === 'ai_analyst') {
    return <AIAnalystModule journals={childJournals} childrenList={childrenList} showToast={showToast} />;
  }

  if (activeMenu === 'messages') {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="font-bold text-lg text-slate-800 mb-4">Percakapan dengan Guru</h3>
        <div className="space-y-3">
          {messages.map(m => (
            <div key={m.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-blue-700">{m.time}</p>
                <p className="text-sm text-slate-800 font-medium mt-1">{m.text}</p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-bold">Terkirim</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div className="p-6 bg-white rounded-2xl shadow-sm border"><p className="text-slate-600">Modul Orang Tua aktif.</p></div>;
}

// ==========================================
// 6. ADDITIONAL MODULES (CALENDAR, REPORTS, AI)
// ==========================================

function CalendarModule({ journals, childrenList }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
      <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
        <Calendar className="text-emerald-600" /> Kalender Jurnal Kebiasaan
      </h3>
      <p className="text-sm text-slate-500">Menampilkan rekam jejak harian 7 kebiasaan anak.</p>
      <div className="grid grid-cols-7 gap-2 pt-2">
        {['Min', 'Sen', 'Sel', 'Rabu', 'Kam', 'Jum', 'Sab'].map((d, idx) => (
          <div key={idx} className="p-3 bg-slate-100 rounded-xl text-center font-bold text-xs text-slate-600">{d}</div>
        ))}
        {Array.from({ length: 30 }).map((_, idx) => {
          const day = idx + 1;
          const dateStr = `2026-03-${day < 10 ? '0' + day : day}`;
          const hasRecord = journals.some(j => j.date === dateStr);
          return (
            <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between h-20 ${
              hasRecord ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="font-bold text-xs text-slate-700">{day}</span>
              {hasRecord && <span className="w-2 h-2 rounded-full bg-emerald-600 self-end"></span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReportsModule({ journals, childrenList, showToast }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <FileText className="text-emerald-600" /> Laporan Perkembangan Kebiasaan
          </h3>
          <p className="text-sm text-slate-500">Pilih rentang dan unduh laporan resmi lembaga.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => showToast('Laporan berhasil dicetak!')} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm flex items-center gap-2">
            <Printer size={16} /> Cetak
          </button>
          <button onClick={() => showToast('Unduh PDF berhasil!')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow">
            <Download size={16} /> Unduh PDF
          </button>
        </div>
      </div>

      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
        <h4 className="font-bold text-slate-900">Pratinjau Dokumen Rekapitulasi</h4>
        <p className="text-sm text-slate-600">Total entri jurnal tersimpan dalam sistem: <strong>{journals.length} catatan</strong>.</p>
        <p className="text-xs text-slate-400">{APP_CREDIT}</p>
      </div>
    </div>
  );
}

function AIAnalystModule({ journals, childrenList, showToast }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState(null);

  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setReport({
        summary: "Berdasarkan catatan jurnal yang tersedia, anak menunjukkan pola positif dalam kebiasaan Bangun Pagi dan Beribadah secara konsisten.",
        positive: ["Bangun pagi tepat waktu dengan ceria", "Keterlibatan aktif dalam kegiatan ibadah dan doa bersama"],
        guidance: ["Pembiasaan makan sayur dan buah perlu terus didampingi secara menyenangkan di rumah."],
        comparison: "Catatan rumah dan sekolah saling melengkapi dengan sangat baik tanpa kesenjangan berarti.",
        recommendation: "Lanjutkan apresiasi positif tanpa reward berlebihan, pertahankan rutinitas tidur cepat."
      });
      showToast('Analisis HEBAAT AI berhasil diselesaikan!');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-6 rounded-3xl shadow-lg flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="text-amber-300" /> HEBAAT AI Habit Analyst
          </h3>
          <p className="text-purple-100 text-sm mt-1">Analisis perkembangan pola 7 Kebiasaan secara objektif, hangat, dan mendidik.</p>
        </div>
        <button 
          onClick={runAnalysis}
          disabled={analyzing}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold rounded-xl shadow text-sm transition flex items-center gap-2"
        >
          {analyzing ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
          {analyzing ? 'Menganalisis...' : 'Jalankan Analisis AI'}
        </button>
      </div>

      {report && (
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
          <h4 className="font-bold text-slate-900 text-lg border-b pb-2">Hasil Analisis & Rekomendasi HEBAAT AI</h4>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <p className="font-bold text-emerald-900 mb-1">A. Ringkasan Kondisi Jurnal</p>
              <p>{report.summary}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="font-bold text-blue-900 mb-1">B. Pola Positif</p>
              <ul className="list-disc pl-5 space-y-1">
                {report.positive.map((p, idx) => <li key={idx}>{p}</li>)}
              </ul>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <p className="font-bold text-amber-900 mb-1">C. Area Pendampingan</p>
              <ul className="list-disc pl-5 space-y-1">
                {report.guidance.map((g, idx) => <li key={idx}>{g}</li>)}
              </ul>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="font-bold text-slate-900 mb-1">D. Kesimpulan & Rekomendasi Guru/Orang Tua</p>
              <p>{report.recommendation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}