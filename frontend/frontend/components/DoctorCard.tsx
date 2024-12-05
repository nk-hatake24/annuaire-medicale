import { FaEnvelope, FaPhone, FaHospital } from 'react-icons/fa'
import { FaLocationCrosshairs } from 'react-icons/fa6'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Doctor } from '@/lib/utils'

interface DoctorCardProps {
  doctor: Doctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="bg-blue-800 text-blue-50">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{doctor.username}</CardTitle>
        <p className="text-lg text-blue-300 text-center">{doctor.speciality}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="flex items-center gap-2">
          <FaPhone className="text-blue-300" />
          {doctor.phoneNumber}
        </p>
        <p className="flex items-center gap-2">
          <FaEnvelope className="text-blue-300" />
          {doctor.email}
        </p>
        <p className="flex items-center gap-2">
          <FaHospital className="text-blue-300" />
          {doctor.healthCenter}
        </p>
        <p className="flex items-center gap-2">
          <FaLocationCrosshairs className="text-blue-300" />
          {doctor.town}
        </p>
      </CardContent>
    </Card>
  )
}

