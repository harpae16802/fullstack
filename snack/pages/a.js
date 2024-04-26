import Section from '@/components/layout/section';
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import SearchBar from '@/components/common/search-bar';
import Link from 'next/link';
import { useAuth } from '@/contexts/custom-context';
import { useRouter } from 'next/router';
import { MiniloginContext } from '@/contexts/minilogin-context';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { z } from 'zod';
import NomalModal from '@/components/modal/nomalmodal'

// 註冊檢查用


export default function A() {
 

  return (
    <>
<NomalModal></NomalModal>
      <Section>
    
      </Section>
    </>
  );
}
