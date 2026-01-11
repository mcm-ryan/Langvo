# Langvo — MVP Specification & Architecture Guide

## Overview

**Langvo** is a conversation-first language learning platform that pairs learners with real bilingual humans for spontaneous, on-demand language practice.

The core value proposition is enabling **real human conversation**, not content consumption, with a randomized matching experience that is engaging, low-pressure, and incentivized.

This document defines the **MVP scope**, **technical architecture**, **data models**, and **constraints** to guide implementation.

---

## Problem Statement

Most language learning applications focus on vocabulary drills, exercises, or AI chat. They do not effectively provide **real conversation practice with actual humans**, which is essential for fluency.

---

## Solution

Langvo enables:
- Learners to practice a target language via real-time audio calls
- Bilingual users (“Tutors”) to earn points by helping learners
- Randomized, on-demand matching to remove scheduling friction
- Weekly expiring points to incentivize consistent usage

---

## Core Product Principles

- Conversation-first
- Human-to-human (AI assist later)
- On-demand, not scheduled
- Simple incentives
- Minimal friction
- MVP-first, investor-demo ready

---

## User Roles

### Learner
- Sets native language
- Sets target language
- Initiates practice sessions
- Receives weekly expiring points
- Tips tutors with points after calls

### Tutor
- Bilingual user
- Passes lightweight verification
- Toggles availability
- Earns points from learners
- Views earned points and call history

---

## MVP Scope (Strict)

### Included
- Web application only
- Audio-only calls
- On-demand matching
- Weekly expiring points
- Manual tutor approval
- Random tutor selection
- Call duration limits (10–15 minutes)

### Explicitly Excluded (Do NOT build)
- Scheduling
- Video calls
- Payments / cash-out
- Gift card integrations
- Mobile apps
- AI conversation analysis
- Advanced recommendation systems
- Multi-language proficiency scoring

---

## Core User Flows

### Learner Flow
1. Sign up / log in
2. Set native + target language
3. Click “Start Practice”
4. Matched with available tutor
5. Audio call begins
6. Call auto-ends after time limit
7. Learner optionally tips tutor with points

### Tutor Flow
1. Sign up
2. Submit language info
3. Await manual approval
4. Toggle availability
5. Receive calls
6. Earn points
7. View dashboard (points + history)

---

## Matching Logic (MVP)

Match learner to tutor where:
- Tutor.nativeLanguage == Learner.targetLanguage
- Tutor.isApproved == true
- Tutor.isAvailable == true

Selection:
- Random choice among valid tutors

If no tutor available:
- Gracefully show “No tutors available right now”

---

## Weekly Points System

- Learners receive N points weekly
- Points expire weekly (use-it-or-lose-it)
- Points can be gifted to tutors after calls
- No cash redemption in MVP
- Ledger-based system for extensibility

---

## Technical Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js Server Actions / API Routes
- Node.js
- Prisma ORM

### Database
- PostgreSQL

### Real-Time Calls
**MVP Recommendation:**
- Managed WebRTC provider (Daily.co or LiveKit Cloud)
- Audio-only
- Replaceable later with self-hosted LiveKit

### Presence & Matching
- Redis (Upstash free tier)
- Track tutor availability + active calls

### Authentication
- Auth.js (NextAuth)
- OAuth (Google) + magic link
- No passwords

---

## Containerization

- Docker for all services
- docker-compose for local development
- Production-ready container structure

