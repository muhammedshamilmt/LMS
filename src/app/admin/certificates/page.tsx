"use client";

import React, { useState } from "react";
import {
  Award,
  Search,
  Filter,
  Download,
  MoreVertical,
  X,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Mail,
  Printer,
  LayoutTemplate,
  Check
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("issued");

  // Mock data for templates
  const templates = [
    { id: 1, name: "Modern Minimalist", color: "blue" },
    { id: 2, name: "Classic Serif", color: "indigo" },
    { id: 3, name: "Dark Elegance", color: "slate" },
    { id: 4, name: "Creative Bold", color: "purple" }
  ];

  // Mock data for certificates
  const certificates = [
    {
      id: "CERT-2023-891",
      studentName: "Emma Thompson",
      studentEmail: "emma.t@example.com",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      course: "Advanced UI/UX Design Masterclass",
      issueDate: "Oct 24, 2023",
      status: "Valid",
      grade: "98%",
      instructor: "Sajibur Rahman"
    },
    {
      id: "CERT-2023-890",
      studentName: "Michael Chen",
      studentEmail: "m.chen@example.com",
      avatar: "https://i.pravatar.cc/150?u=b042581f4e29026024d",
      course: "Full-Stack Web Development",
      issueDate: "Oct 22, 2023",
      status: "Valid",
      grade: "92%",
      instructor: "Sajibur Rahman"
    },
    {
      id: "CERT-2023-889",
      studentName: "Sarah Jenkins",
      studentEmail: "sarah.j@example.com",
      avatar: "https://i.pravatar.cc/150?u=c042581f4e29026024d",
      course: "Python for Data Science",
      issueDate: "Oct 18, 2023",
      status: "Revoked",
      grade: "N/A",
      instructor: "Sajibur Rahman"
    },
    {
      id: "CERT-2023-888",
      studentName: "David Rodriguez",
      studentEmail: "d.rod@example.com",
      avatar: "https://i.pravatar.cc/150?u=d042581f4e29026024d",
      course: "Digital Marketing Fundamentals",
      issueDate: "Oct 15, 2023",
      status: "Valid",
      grade: "88%",
      instructor: "Sajibur Rahman"
    },
    {
      id: "CERT-2023-887",
      studentName: "Lisa Wang",
      studentEmail: "lisa.w@example.com",
      avatar: "https://i.pravatar.cc/150?u=e042581f4e29026024d",
      course: "Advanced UI/UX Design Masterclass",
      issueDate: "Oct 12, 2023",
      status: "Valid",
      grade: "95%",
      instructor: "Sajibur Rahman"
    },
  ];

  const filteredCerts = certificates.filter(
    (cert) =>
      cert.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full w-full bg-gray-50/50 dark:bg-black overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 transition-all duration-300">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Certificates</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage, verify, and issue completion certificates.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all  ue-500/20 flex items-center justify-center gap-2">
              <Award className="w-4 h-4" /> Issue Certificate
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex items-center gap-4 border-b border-gray-200 dark:border-zinc-800 mb-8">
          <button
            onClick={() => setActiveTab("issued")}
            className={`pb-3 text-sm font-medium transition-colors relative ${activeTab === 'issued' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
          >
            Issued Certificates
            {activeTab === 'issued' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`pb-3 text-sm font-medium transition-colors relative flex items-center gap-2 ${activeTab === 'templates' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
          >
            <LayoutTemplate className="w-4 h-4" />
            Templates
            {activeTab === 'templates' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full"></div>
            )}
          </button>
        </div>

        {activeTab === "issued" ? (
          <>
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-gray-100 dark:border-zinc-800  relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Award className="w-16 h-16 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Issued</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">1,248</div>
                <div className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1">
                  <span className="text-green-500 text-xs">▲</span> +12% this month
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-gray-100 dark:border-zinc-800  relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <CheckCircle2 className="w-16 h-16 text-blue-600" />
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Valid Certificates</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">1,242</div>
                <div className="text-sm text-gray-500 mt-2">Active in the registry</div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-[24px] p-6 border border-gray-100 dark:border-zinc-800  relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <AlertTriangle className="w-16 h-16 text-red-500" />
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Revoked</div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">6</div>
                <div className="text-sm text-red-500 mt-2 font-medium">Requires attention</div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[24px]  overflow-hidden flex flex-col">

              {/* Table Header & Search */}
              <div className="p-5 border-b border-gray-100 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50 dark:bg-zinc-900/50">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search student, course, or ID..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>

              {/* Table Data */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-zinc-900/80 border-b border-gray-100 dark:border-zinc-800 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
                      <th className="p-4 pl-6">Student</th>
                      <th className="p-4">Certificate ID</th>
                      <th className="p-4">Course</th>
                      <th className="p-4">Issue Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right pr-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                    {filteredCerts.map((cert, index) => (
                      <tr
                        key={cert.id}
                        onClick={() => setSelectedCert(cert)}
                        className={`hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer group ${selectedCert?.id === cert.id ? 'bg-blue-50/80 dark:bg-blue-900/20' : 'bg-white dark:bg-zinc-900'}`}
                      >
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9 border border-gray-100 dark:border-zinc-700 ">
                              <AvatarImage src={cert.avatar} />
                              <AvatarFallback>{cert.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{cert.studentName}</div>
                              <div className="text-xs text-gray-500">{cert.studentEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                            <Award className="w-3.5 h-3.5 text-blue-500" /> {cert.id}
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                          {cert.course}
                        </td>
                        <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                          {cert.issueDate}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cert.status === 'Valid'
                            ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
                            : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'
                            }`}>
                            {cert.status === 'Valid' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                            {cert.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                            onClick={(e) => { e.stopPropagation(); setSelectedCert(cert); }}
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredCerts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500 dark:text-gray-400">
                          No certificates found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in duration-300">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-lg font-bold">Certificate Templates</h2>
              <button className="px-4 py-2 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl text-sm font-medium transition-colors  text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800">
                + Create New Template
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {templates.map(template => (
                <div key={template.id} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-[24px] p-4  group hover:border-blue-200 dark:hover:border-blue-900/50 transition-colors cursor-pointer">
                  {/* Template Visual Thumbnail */}
                  <div className={`w-full aspect-[1.414] bg-${template.color}-50/50 dark:bg-zinc-950 border border-${template.color}-100 dark:border-zinc-800 rounded-xl mb-4 relative overflow-hidden flex flex-col items-center justify-center`}>

                    {/* Decorative Elements inside Thumbnail */}
                    <div className={`absolute top-0 left-0 w-20 h-20 bg-${template.color}-100 dark:bg-${template.color}-900/20 rounded-br-full opacity-50`}></div>
                    <div className={`absolute bottom-0 right-0 w-24 h-24 bg-${template.color}-600 dark:bg-${template.color}-500 rounded-tl-full opacity-10`}></div>

                    <div className="w-[80%] h-3 bg-gray-200 dark:bg-zinc-800 rounded-full mb-3"></div>
                    <div className="w-[60%] h-2 bg-gray-100 dark:bg-zinc-700 rounded-full mb-6"></div>

                    <div className={`w-8 h-8 rounded-full border-2 border-${template.color}-200 dark:border-${template.color}-900/50 flex items-center justify-center mb-4`}>
                      <Award className={`w-4 h-4 text-${template.color}-500`} />
                    </div>

                    <div className="w-[70%] h-2 bg-gray-100 dark:bg-zinc-800 rounded-full mb-2"></div>
                    <div className="w-[50%] h-2 bg-gray-100 dark:bg-zinc-800 rounded-full"></div>

                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                        <button className="px-4 py-2 bg-white text-blue-600 font-semibold text-sm rounded-full ">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center px-2">
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{template.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Used in {template.id * 3} courses</div>
                    </div>
                    {template.id === 1 && (
                      <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded">Active</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Slide-out Sidebar for Certificate Preview */}
      <div className={`fixed top-0 right-0 h-full w-[400px] lg:w-[500px] rounded-l-4xl bg-white dark:bg-zinc-950 border-l border-gray-100 dark:border-zinc-800 l transition-transform duration-300 ease-in-out z-40 transform ${selectedCert ? 'translate-x-0' : 'translate-x-full'}`}>
        {selectedCert && (
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center ">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                Certificate Preview
              </h2>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sidebar Body */}
            <div className="flex-1 overflow-y-auto p-6">

              {/* Certificate Template Visual */}
              <div className="w-full aspect-[1.414] bg-white border-[10px] border-blue-50  rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden mb-6 group">

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-br-full opacity-50 -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-600 rounded-tl-full opacity-10 translate-x-10 translate-y-10"></div>

                <div className="text-center z-10 w-full">
                  <div className="uppercase tracking-[0.2em] text-xs font-bold text-blue-600 mb-4">Certificate of Completion</div>
                  <div className="text-[10px] text-gray-500 mb-2 uppercase">This is proudly presented to</div>

                  <div className="font-serif text-3xl text-gray-900 mb-3 border-b border-gray-200 pb-2 px-8 inline-block">
                    {selectedCert.studentName}
                  </div>

                  <div className="text-[10px] text-gray-500 max-w-[80%] mx-auto leading-relaxed mb-6">
                    For successfully completing the comprehensive requirements and demonstrating proficiency in
                    <span className="font-bold text-gray-800 block mt-1 text-xs">{selectedCert.course}</span>
                  </div>

                  <div className="flex justify-between items-end w-full px-8 mt-4">
                    <div className="text-center">
                      <div className="border-b border-gray-300 w-24 pb-1 mb-1">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Signature_of_John_Hancock.svg" alt="Signature" className="h-6 mx-auto opacity-70" />
                      </div>
                      <div className="text-[8px] text-gray-500 uppercase">{selectedCert.instructor}</div>
                      <div className="text-[7px] text-gray-400">Lead Instructor</div>
                    </div>

                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center relative ner">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>

                    <div className="text-center">
                      <div className="border-b border-gray-300 w-24 pb-1 mb-1 text-xs font-medium text-gray-700 h-7 flex items-end justify-center">
                        {selectedCert.issueDate}
                      </div>
                      <div className="text-[8px] text-gray-500 uppercase">Date of Issue</div>
                      <div className="text-[7px] text-gray-400 font-mono">{selectedCert.id}</div>
                    </div>
                  </div>
                </div>

                {/* Hover overlay for download */}
                <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded-full  transform hover:scale-105 transition-all flex items-center gap-2">
                    <Download className="w-5 h-5" /> Download HD PDF
                  </button>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wider mb-2">Certificate Details</h3>

                <div className="bg-gray-50 dark:bg-zinc-900/50 rounded-xl p-4 space-y-4 border border-gray-100 dark:border-zinc-800">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Student</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedCert.studentName}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Course</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white text-right max-w-[200px] truncate">{selectedCert.course}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Final Grade</span>
                    <span className="text-sm font-bold text-blue-600">{selectedCert.grade}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Credential ID</span>
                    <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-200 dark:bg-zinc-800 px-2 py-0.5 rounded">{selectedCert.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Footer Actions */}
            <div className="p-4 border-t border-gray-100 dark:border-zinc-800  flex gap-3">
              <button className="flex-1 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Email
              </button>
              <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors  ue-500/20 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download
              </button>
              <button className="px-4 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium text-sm hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop overlay for sidebar */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setSelectedCert(null)}
        />
      )}
    </div>
  );
}
