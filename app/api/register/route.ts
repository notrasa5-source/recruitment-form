export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendRegistrationEmail } from '@/lib/email';
import { registrationSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the input data
    const validatedData = registrationSchema.parse(body);

    // Check if student number already exists
    const { data: existingStudent, error: checkError } = await supabaseAdmin
      .from('registrations')
      .select('roll_no')
      .eq('roll_no', validatedData.roll_no)
      .single();

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student number already registered' },
        { status: 400 }
      );
    }

    // Insert into database
    const { data: registration, error: dbError } = await supabaseAdmin
      .from('registrations')
      .insert([validatedData])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save registration' },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      await sendRegistrationEmail(
        validatedData.email,
        validatedData.name,
        validatedData.roll_no
      );
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the registration if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      data: registration,
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { error: 'Invalid form data. Please check your inputs.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}