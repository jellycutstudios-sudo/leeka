import React, { useState } from 'react';
import { MessageCircle, Check, Copy, ArrowLeft, RefreshCw, HeartHandshake } from 'lucide-react';
import type { EnquiryData } from '../../types/enquiry';
import { Button } from '../../components/Button';
import { buildWhatsAppMessage, buildWhatsAppUrl, getBusinessWhatsAppNumber } from '../../lib/whatsapp';

interface StepHandoffDoneProps {
  data: EnquiryData;
  onEdit: () => void;
  onReset: () => void;
}

export const StepHandoffDone: React.FC<StepHandoffDoneProps> = ({
  data,
  onEdit,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = buildWhatsAppUrl(data);
  const messageText = buildWhatsAppMessage(data);
  const businessNumber = getBusinessWhatsAppNumber();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleReopen = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center gap-6 animate-fadeIn">
      {/* Icon */}
      <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-sm">
        <MessageCircle className="w-8 h-8 fill-emerald-100" />
      </div>

      <div>
        <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#B59A70] block mb-1">
          Handoff Initiated
        </span>
        <h2 className="font-editorial text-3xl font-semibold text-[#242424]">
          WhatsApp Has Been Opened
        </h2>
        <p className="text-sm text-[#5A5A5A] max-w-md mx-auto mt-2 leading-relaxed">
          Please tap <strong>&quot;Send&quot;</strong> inside WhatsApp to deliver your enquiry directly to Leeka Wedding (+{businessNumber}).
        </p>
      </div>

      {/* Helpful reminder card */}
      <div className="w-full p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] text-left text-xs flex items-start gap-3">
        <HeartHandshake className="w-5 h-5 text-[#B59A70] shrink-0 mt-0.5" />
        <div className="text-[#5A5A5A] leading-relaxed">
          <p className="font-semibold text-[#242424] mb-0.5">What happens next?</p>
          <p>
            Our creative team reviews incoming enquiries daily. We will verify dates, check team availability, and reply with custom packages and bespoke quote options.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="w-full flex flex-col gap-2.5">
        <Button
          onClick={handleReopen}
          variant="primary"
          size="lg"
          fullWidth
          className="bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Didn&apos;t open? Launch WhatsApp Again</span>
        </Button>

        <Button
          onClick={handleCopy}
          variant="secondary"
          size="md"
          fullWidth
          className="flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">Message Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#737373]" />
              <span>Copy Message to Clipboard</span>
            </>
          )}
        </Button>

        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#242424] transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Modify Details</span>
          </button>
          <span className="text-[#D1CCC2]">•</span>
          <button
            onClick={onReset}
            className="text-xs text-[#737373] hover:text-rose-600 transition-colors cursor-pointer py-1"
          >
            <span>Start a Fresh Enquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
};
