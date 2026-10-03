import React from 'react';
import { useSeo } from '../../context/SeoContext';
import { OutreachItem } from '../../types/seo';
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  RotateCcw,
  Send,
  ExternalLink
} from 'lucide-react';

export const FollowupsView: React.FC = () => {
  const { outreachList, updateOutreach, addToast } = useSeo();

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSnooze = (item: OutreachItem, days: number) => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);
    const dateStr = nextDate.toISOString().split('T')[0];

    updateOutreach(item.id, {
      nextFollowupDate: dateStr,
      followupCount: item.followupCount + 1
    });

    addToast({
      type: 'info',
      title: 'Follow-up Scheduled',
      description: `Next reminder set for ${dateStr} (Follow-up #${item.followupCount + 1})`
    });
  };

  const handleMarkResponded = (item: OutreachItem) => {
    updateOutreach(item.id, {
      status: 'Negotiating',
      nextFollowupDate: undefined
    });
    addToast({
      type: 'success',
      title: 'Response Logged',
      description: `${item.contactPerson} responded! Moved to Negotiating.`
    });
  };

  const overdueList = outreachList.filter(
    (o) =>
      o.nextFollowupDate &&
      o.nextFollowupDate <= todayStr &&
      o.status !== 'Published' &&
      o.status !== 'Declined'
  );

  const upcomingList = outreachList.filter(
    (o) =>
      o.nextFollowupDate &&
      o.nextFollowupDate > todayStr &&
      o.status !== 'Published' &&
      o.status !== 'Declined'
  );

  return (
    <div className="p-3.5 sm:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Outreach Follow-up Scheduler & Reminders
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Over 60% of successful guest posts are secured on the 1st or 2nd follow-up. Keep conversations warm without spamming editors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-amber-950/60 border border-amber-500/40 text-amber-300">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{overdueList.length} Follow-ups Due Today</span>
          </div>
        </div>
      </div>

      {/* Overdue / Due Now Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Due for Follow-up ({overdueList.length})</span>
        </h2>

        {overdueList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overdueList.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-sm text-white">{item.websiteName}</h3>
                    <div className="text-[11px] text-slate-400">
                      Editor: {item.contactPerson} ({item.contactEmail})
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-amber-400 font-semibold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    Follow-up #{item.followupCount + 1} Due
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                  <div className="text-[10px] text-slate-400 uppercase font-medium">Pitch Topic:</div>
                  <div className="font-medium truncate mt-0.5">{item.pitchTopic}</div>
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Initial pitch sent:</span>
                  <span className="font-mono text-slate-300">{item.sentDate}</span>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleMarkResponded(item)}
                    className="flex-1 py-1.5 text-xs font-semibold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Editor Replied</span>
                  </button>

                  <button
                    onClick={() => handleSnooze(item, 3)}
                    className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
                    title="Send follow-up & snooze 3 days"
                  >
                    +3 Days
                  </button>

                  <button
                    onClick={() => handleSnooze(item, 7)}
                    className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
                    title="Snooze 7 days"
                  >
                    +7 Days
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800/80 text-xs">
            🎉 All scheduled follow-ups are up to date!
          </div>
        )}
      </div>

      {/* Upcoming Follow-ups Section */}
      <div className="space-y-3 pt-4">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Upcoming Scheduled Follow-ups ({upcomingList.length})</span>
        </h2>

        <div className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400 font-medium">
              <tr>
                <th className="py-3 px-4">Target Website</th>
                <th className="py-3 px-3">Contact Person</th>
                <th className="py-3 px-3">Topic / Subject</th>
                <th className="py-3 px-3">Current Status</th>
                <th className="py-3 px-3">Follow-up Count</th>
                <th className="py-3 px-3">Scheduled Reminder</th>
                <th className="py-3 px-4 text-center">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
              {upcomingList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-white">
                    {item.websiteName}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-300">
                    {item.contactPerson}
                  </td>
                  <td className="py-3 px-3 font-sans text-slate-400 truncate max-w-[200px]">
                    {item.pitchTopic}
                  </td>
                  <td className="py-3 px-3 font-sans text-emerald-400">
                    {item.status}
                  </td>
                  <td className="py-3 px-3 tabular-nums">
                    #{item.followupCount} sent
                  </td>
                  <td className="py-3 px-3 text-slate-200">
                    {item.nextFollowupDate}
                  </td>
                  <td className="py-3 px-4 font-sans text-center">
                    <button
                      onClick={() => handleMarkResponded(item)}
                      className="px-2.5 py-1 text-[11px] text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded hover:bg-emerald-900/60 transition-colors"
                    >
                      Mark Responded
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
